const { spawn } = require("child_process");
const fs = require("fs");

function generateVoice(text) {
  return new Promise((resolve, reject) => {
    const cleanedText = text
      .replace(/"/g, "")
      .replace(/\n/g, " ");

    const process = spawn("python", [
      "-m",
      "edge_tts",
      "--text",
      cleanedText,
      "--voice",
      "en-US-GuyNeural",
      "--write-media",
      "output/voice.mp3"
    ]);

    process.stderr.on("data", (data) => {
      console.error(`Voice error: ${data}`);
    });

    process.on("close", (code) => {
      if (code === 0 && fs.existsSync("output/voice.mp3")) {
        console.log("Voice generated successfully");
        resolve();
      } else {
        reject("Voice generation failed");
      }
    });
  });
}

module.exports = generateVoice;
