// Quick test script
const generateScript = require("./script");
const generateVoice = require("./voice");
const enhanceSubtitles = require("./subtitles");
const renderVideo = require("./render");

async function test() {
    try {
        console.log("🎬 Testing video generation...\n");

        // Use a simple test script
        const testScript = "AI is changing the world. Jobs are evolving. Are you ready for the future?";

        console.log("Script:", testScript);

        console.log("\n🎤 Generating voice...");
        await generateVoice(testScript);

        console.log("\n📝 Enhancing subtitles...");
        enhanceSubtitles("output/voice.srt");

        console.log("\n🎥 Rendering video...");
        await renderVideo();

        console.log("\n✅ Test complete! Check output/final.mp4");
    } catch (error) {
        console.error("❌ Test failed:", error);
    }
}

test();
