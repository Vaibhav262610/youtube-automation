const { exec } = require("child_process");

function generateVoice(text) {
  return new Promise((resolve, reject) => {
    const command = `edge-tts --text "${text.replace(/"/g, "")}" --voice en-US-GuyNeural --write-media output/voice.mp3`;

    exec(command, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

module.exports = generateVoice;
