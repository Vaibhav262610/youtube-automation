// Simple test to verify all components work
const fs = require("fs");

console.log("🧪 Testing video generation components...\n");

// Test 1: Check if output directory exists
if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
}
console.log("✓ Output directory ready");

// Test 2: Check if background video exists
if (fs.existsSync("assets/background.mp4")) {
    console.log("✓ Background video found");
} else {
    console.log("✗ Background video missing!");
}

// Test 3: Check if FFmpeg is accessible
const { exec } = require("child_process");
exec('"C:\\ffmpeg\\bin\\ffmpeg.exe" -version', (error, stdout) => {
    if (error) {
        console.log("✗ FFmpeg not found!");
    } else {
        console.log("✓ FFmpeg accessible");
    }
});

// Test 4: Run actual generation
console.log("\n🎬 Running actual video generation...\n");

const generateScript = require("./script");
const generateVoice = require("./voice");
const generateImages = require("./images");
const createViralCaptions = require("./captions");
const renderVideo = require("./render");

async function test() {
    try {
        const script = await generateScript("AI secrets");
        console.log("✓ Script generated:", script.substring(0, 50) + "...\n");

        await generateVoice(script);
        console.log("✓ Voice generated\n");

        await generateImages(script);
        console.log("✓ Images generated\n");

        createViralCaptions("output/voice.srt");
        console.log("✓ Captions created\n");

        await renderVideo();
        console.log("\n✅ VIDEO COMPLETE! Check output/final.mp4");

    } catch (error) {
        console.error("\n❌ Test failed:", error.message);
    }
}

test();
