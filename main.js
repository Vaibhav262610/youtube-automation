const generateScript = require("./script");
const generateVoice = require("./voice");
const generateImages = require("./images");
const createViralCaptions = require("./captions");
const renderVideo = require("./render");

const topic = process.argv[2];

if (!topic) {
  console.log("Usage: node main.js \"your topic\"");
  process.exit(1);
}

async function run() {
  try {
    console.log("🎬 Starting professional video generation...\n");

    console.log("📝 Step 1: Generating script...");
    const script = await generateScript(topic);
    console.log("   Script:", script);

    console.log("\n🎤 Step 2: Generating voice...");
    await generateVoice(script);

    console.log("\n🎨 Step 3: Generating AI images...");
    try {
      await generateImages(script);
    } catch (error) {
      console.log("   ⚠️  Image generation skipped:", error.message);
      console.log("   Video will continue without images");
    }

    console.log("\n📝 Step 4: Creating animated captions...");
    try {
      createViralCaptions("output/voice.srt");
    } catch (error) {
      console.log("   ⚠️  Caption creation failed:", error.message);
      console.log("   Video will use basic subtitles");
    }

    console.log("\n🎥 Step 5: Rendering professional video...");
    await renderVideo();

    console.log("\n✅ PROFESSIONAL VIDEO READY! 🔥");
    console.log("📁 Output: output/final.mp4");
    console.log("\nFeatures included:");
    console.log("  ✓ Premium voice quality");
    console.log("  ✓ AI-generated images (if available)");
    console.log("  ✓ Animated captions");
    console.log("  ✓ Professional audio mix");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

run();
