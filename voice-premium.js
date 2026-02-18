const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

// Generate premium voice using ElevenLabs (if API key available) or edge-tts
async function generateVoice(text) {
    const cleanedText = text
        .replace(/"/g, "")
        .replace(/\n/g, " ");

    // Check if ElevenLabs API key is available
    if (process.env.ELEVENLABS_API_KEY) {
        console.log("Using ElevenLabs premium voice...");
        return generateElevenLabsVoice(cleanedText);
    } else {
        console.log("Using edge-tts voice (add ELEVENLABS_API_KEY to .env for premium quality)");
        return generateEdgeTTSVoice(cleanedText);
    }
}

// Premium voice with ElevenLabs
async function generateElevenLabsVoice(text) {
    try {
        // Using Adam voice (energetic, clear, professional)
        const voiceId = "pNInz6obpgDQGcFmaJgB"; // Adam - energetic male

        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                text: text,
                model_id: "eleven_turbo_v2", // Fast and high quality
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    style: 0.5,
                    use_speaker_boost: true
                }
            },
            {
                headers: {
                    "Accept": "audio/mpeg",
                    "xi-api-key": process.env.ELEVENLABS_API_KEY,
                    "Content-Type": "application/json"
                },
                responseType: "arraybuffer"
            }
        );

        fs.writeFileSync("output/voice.mp3", response.data);
        console.log("✅ Premium voice generated with ElevenLabs!");

        // Generate SRT using Whisper or fallback
        await generateSRTFromAudio();

        return true;
    } catch (error) {
        console.error("ElevenLabs failed:", error.message);
        console.log("Falling back to edge-tts...");
        return generateEdgeTTSVoice(text);
    }
}

// Fallback to edge-tts
function generateEdgeTTSVoice(text) {
    return new Promise((resolve, reject) => {
        const { spawn } = require("child_process");

        const process = spawn("python", [
            "-m",
            "edge_tts",
            "--text",
            text,
            "--voice",
            "en-US-GuyNeural", // Clear, professional US voice
            "--rate",
            "+30%",
            "--write-media",
            "output/voice.mp3",
            "--write-subtitles",
            "output/voice.srt"
        ]);

        process.stderr.on("data", (data) => {
            console.error(`Voice: ${data}`);
        });

        process.on("close", (code) => {
            if (code === 0 && fs.existsSync("output/voice.mp3")) {
                console.log("✅ Voice generated with edge-tts!");
                resolve();
            } else {
                reject("Voice generation failed");
            }
        });
    });
}

// Generate SRT from audio using Whisper or simple timing
async function generateSRTFromAudio() {
    // For now, create a simple SRT based on text length
    // In production, you'd use Whisper API for accurate timing
    const audioPath = "output/voice.mp3";

    // Simple SRT generation (you can enhance this with Whisper)
    const srt = `1
00:00:00,100 --> 00:00:20,000
Generated with ElevenLabs
`;

    fs.writeFileSync("output/voice.srt", srt);
}

module.exports = generateVoice;
