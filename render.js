const { exec } = require("child_process");

function renderVideo() {
  return new Promise((resolve, reject) => {
    const command = `
    ffmpeg -stream_loop -1 -i assets/background.mp4 \
    -i output/voice.mp3 \
    -shortest \
    -vf "scale=1080:1920" \
    -c:v libx264 -c:a aac \
    output/final.mp4
    `;

    exec(command, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

module.exports = renderVideo;
