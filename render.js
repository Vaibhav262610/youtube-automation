const { exec } = require("child_process");

function renderVideo() {
  return new Promise((resolve, reject) => {
    const command = `"C:\\ffmpeg\\bin\\ffmpeg.exe" -i assets/background.mp4 -i output/voice.mp3 -vf "scale=1080:1920,drawtext=fontfile=assets/font.ttf:text='AI REPLACES ACCOUNTANTS?':fontcolor=white:fontsize=70:box=1:boxcolor=black@0.6:boxborderw=20:x=(w-text_w)/2:y=200:enable='between(t,0,3)',subtitles=output/voice.srt:force_style='Fontname=Arial,Fontsize=48,PrimaryColour=&Hffffff&,OutlineColour=&H000000&,Outline=3,Alignment=2'" -c:v libx264 -preset ultrafast -crf 30 -c:a aac -shortest -y output/final.mp4`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error("FFmpeg ERROR:\n", stderr);
        reject(err);
      } else {
        console.log("Video rendered successfully");
        resolve();
      }
    });
  });
}

module.exports = renderVideo;
