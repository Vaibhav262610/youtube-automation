// Re-render video with fixed subtitles (without regenerating voice)
const enhanceSubtitles = require("./subtitles");
const renderVideo = require("./render");
const fs = require("fs");

async function rerender() {
    console.log("🔄 Re-rendering video with fixed subtitles...\n");

    // Check if voice files exist
    if (!fs.existsSync("output/voice.mp3")) {
        console.log("❌ output/voice.mp3 not found! Run: node main.js \"topic\" first");
        return;
    }

    if (!fs.existsSync("output/voice.srt")) {
        console.log("❌ output/voice.srt not found! Run: node main.js \"topic\" first");
        return;
    }

    console.log("📝 Regenerating subtitles with fix...");
    enhanceSubtitles("output/voice.srt");

    console.log("\n🎥 Rendering video...");
    await renderVideo();

    console.log("\n✅ Video re-rendered successfully!");
    console.log("📁 Output: output/final.mp4");
    console.log("\n💡 Check if subtitles now appear word-by-word throughout the video");
}

rerender().catch(console.error);
