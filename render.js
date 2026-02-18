const { exec } = require("child_process");
const fs = require("fs");
const { promisify } = require("util");
const execPromise = promisify(exec);

async function renderVideo() {
  try {
    const assPath = "output/captions.ass";
    const escapedAssPath = assPath.replace(/\\/g, "/").replace(/:/g, "\\\\:");

    const duration = await getAudioDuration("output/voice.mp3");
    console.log(`✓ Voice duration: ${duration.toFixed(1)}s`);

    const imagesDir = "output/images";
    const hasImages = fs.existsSync(imagesDir) && fs.readdirSync(imagesDir).length > 0;

    if (hasImages) {
      const images = fs.readdirSync(imagesDir)
        .filter(f => f.endsWith('.jpg') || f.endsWith('.png'))
        .sort()
        .slice(0, 12);

      console.log(`✓ Creating VIRAL video with ${images.length} clips`);
      await buildViralVideo(images, escapedAssPath, duration);
    } else {
      console.log("✓ Using background video only");
      const videoFilter = `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,ass='${escapedAssPath}'`;
      const command = `"C:\\ffmpeg\\bin\\ffmpeg.exe" -i assets/background.mp4 -i output/voice.mp3 -filter_complex "[0:a]volume=0.3[bg];[1:a]volume=5.0[voice];[bg][voice]amix=inputs=2:duration=shortest[audio];[0:v]${videoFilter}[video]" -map "[video]" -map "[audio]" -c:v libx264 -preset medium -crf 20 -c:a aac -b:a 256k -ar 48000 -shortest -y output/final.mp4`;
      await execPromise(command);
    }

    console.log("✅ VIRAL VIDEO RENDERED! 🔥💥");
  } catch (error) {
    console.error("FFmpeg ERROR:\n", error.stderr || error.message);
    throw error;
  }
}

async function getAudioDuration(audioPath) {
  try {
    const { stdout } = await execPromise(`"C:\\ffmpeg\\bin\\ffprobe.exe" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`);
    return parseFloat(stdout.trim());
  } catch (error) {
    return 30;
  }
}

async function buildViralVideo(images, assPath, duration) {
  const clipDuration = Math.max(2, Math.min(3, duration / images.length));

  console.log("🔥 Rendering VIRAL video with zoom effects...");

  let inputs = `-i output/voice.mp3`;
  images.forEach((img) => {
    inputs += ` -loop 1 -t ${clipDuration} -i output/images/${img}`;
  });

  // Build filter with zoom effects
  let filter = `[0:a]volume=6.0,bass=g=5,treble=g=2[voice];`;

  // Process each image with alternating zoom
  images.forEach((img, i) => {
    const inputIndex = i + 1;
    const frames = Math.floor(clipDuration * 30);

    if (i % 2 === 0) {
      // ZOOM IN
      filter += `[${inputIndex}:v]scale=1620:-1,crop=1080:1920,zoompan=z='min(1.0+0.001*on,1.5)':d=${frames}:s=1080x1920:fps=30[v${i}];`;
    } else {
      // ZOOM OUT
      filter += `[${inputIndex}:v]scale=1620:-1,crop=1080:1920,zoompan=z='max(1.5-0.001*on,1.0)':d=${frames}:s=1080x1920:fps=30[v${i}];`;
    }
  });

  // Concatenate all clips
  const concatInputs = images.map((_, i) => `[v${i}]`).join('');
  filter += `${concatInputs}concat=n=${images.length}:v=1:a=0[vid];`;

  // Color grading + captions
  filter += `[vid]eq=contrast=1.2:saturation=1.4,ass='${assPath}'[video]`;

  const command = `"C:\\ffmpeg\\bin\\ffmpeg.exe" ${inputs} -filter_complex "${filter}" -map "[video]" -map "[voice]" -c:v libx264 -preset veryfast -crf 23 -c:a aac -b:a 192k -shortest -y output/final.mp4`;

  console.log("⚡ Rendering with zoom animations...");
  await execPromise(command, { maxBuffer: 10 * 1024 * 1024 });
}

module.exports = renderVideo;
