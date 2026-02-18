const { spawn } = require("child_process");
const fs = require("fs");
const axios = require("axios");
const { promisify } = require("util");
const { exec } = require("child_process");
const execPromise = promisify(exec);
require("dotenv").config();

async function generateVoice(text) {
  const cleanedText = text
    .replace(/"/g, "")
    .replace(/\n/g, " ");

  // Check if ElevenLabs API key is available
  if (process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_API_KEY.length > 10) {
    console.log("🎤 Using ElevenLabs premium voice...");
    try {
      await generateElevenLabsVoice(cleanedText);
      return;
    } catch (error) {
      console.error("❌ ElevenLabs failed:", error.message);
      console.log("Falling back to edge-tts...");
    }
  }

  // Use edge-tts
  console.log("🎤 Using edge-tts voice...");
  return generateEdgeTTSVoice(cleanedText);
}

// Premium voice with ElevenLabs
async function generateElevenLabsVoice(text) {
  // Using Bella - soft, engaging female voice
  const voiceId = "EXAVITQu4vr4xnSDxMaL"; // Bella

  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text: text,
      model_id: "eleven_turbo_v2",
      voice_settings: {
        stability: 0.3,
        similarity_boost: 0.85,
        style: 0.7,
        use_speaker_boost: true
      }
    },
    {
      headers: {
        "Accept": "audio/mpeg",
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
      },
      responseType: "arraybuffer",
      timeout: 30000
    }
  );

  fs.writeFileSync("output/voice.mp3", response.data);
  console.log("✅ Premium voice generated with ElevenLabs!");

  // Get actual audio duration
  console.log("⏱️  Analyzing audio duration...");
  const duration = await getAudioDuration("output/voice.mp3");

  // Generate accurate word-level timing
  generateAccurateTiming(text, duration);
}

// Get actual audio duration using ffprobe
async function getAudioDuration(audioPath) {
  try {
    const { stdout } = await execPromise(`"C:\\ffmpeg\\bin\\ffprobe.exe" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`);
    return parseFloat(stdout.trim());
  } catch (error) {
    console.log("⚠️  Could not get duration, using estimate");
    return 20; // fallback
  }
}

// Generate accurate word-level timing based on actual audio duration
function generateAccurateTiming(text, duration) {
  // Split text into words
  const words = text.split(/\s+/).filter(w => w.length > 0);

  // Calculate timing based on actual audio duration
  const wordDuration = duration / words.length;

  // Generate SRT with word-level timing
  let srt = "";
  let currentTime = 0;

  words.forEach((word, i) => {
    const startTime = currentTime;
    const endTime = currentTime + wordDuration;

    srt += `${i + 1}\n`;
    srt += `${formatSRTTime(startTime)} --> ${formatSRTTime(endTime)}\n`;
    srt += `${word}\n\n`;

    currentTime = endTime;
  });

  fs.writeFileSync("output/voice.srt", srt);
  console.log(`✅ Subtitle timing created (${duration.toFixed(1)}s, ${words.length} words)`);
}

// Format time for SRT (HH:MM:SS,mmm)
function formatSRTTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

// Fallback to edge-tts
function generateEdgeTTSVoice(text) {
  return new Promise((resolve, reject) => {
    // Using super energetic voice
    const process = spawn("python", [
      "-m",
      "edge_tts",
      "--text",
      text,
      "--voice",
      "en-US-AriaNeural",
      "--rate",
      "+40%",
      "--pitch",
      "+8Hz",
      "--write-media",
      "output/voice.mp3",
      "--write-subtitles",
      "output/voice.srt"
    ]);

    process.stderr.on("data", (data) => {
      console.error(`Voice: ${data}`);
    });

    process.on("close", (code) => {
      if (code === 0 && fs.existsSync("output/voice.mp3") && fs.existsSync("output/voice.srt")) {
        console.log("✅ Voice and subtitles generated!");
        resolve();
      } else {
        reject("Voice generation failed");
      }
    });
  });
}

module.exports = generateVoice;
