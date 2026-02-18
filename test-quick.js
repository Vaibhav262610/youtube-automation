const generateScript = require("./script");
const generateVoice = require("./voice");
const generateImages = require("./images");
const createViralCaptions = require("./captions");
const renderVideo = require("./render");

const topic = process.argv[2] || "AI secrets";

async function run() {
    try {
        console.log("🎬 Quick test video generation...\n");

        console.log("📝 Generating script...");
        const script = await generateScript(topic);
        console.log("   Script:", script.substring(0, 100) + "...");

        console.log("\n🎤 Generating voice...");
        await generateVoice(script);

        console.log("\n🎨 Generating images...");
        await generateImages(script);

        console.log("\n📝 Creating captions...");
        createViralCaptions("output/voice.srt");

        console.log("\n🎥 Rendering video...");
        await renderVideo();

        console.log("\n✅ VIDEO READY! Check output/final.mp4");

    } catch (error) {
        console.error("\n❌ Error:", error.message);
        process.exit(1);
    }
}

run();
