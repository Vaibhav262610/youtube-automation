const fs = require("fs");
const enhanceSubtitles = require("./subtitles");

console.log("=== TESTING WITH ACTUAL voice.srt ===\n");

if (!fs.existsSync("output/voice.srt")) {
    console.log("❌ output/voice.srt not found!");
    process.exit(1);
}

const original = fs.readFileSync("output/voice.srt", "utf-8");
console.log("Original SRT:");
console.log(original);
console.log("\n" + "=".repeat(50) + "\n");

enhanceSubtitles("output/voice.srt");

const enhanced = fs.readFileSync("output/enhanced.srt", "utf-8");
const lines = enhanced.split("\n");

console.log("Enhanced SRT (first 30 entries):");
console.log(lines.slice(0, 120).join("\n"));

console.log("\n" + "=".repeat(50));
console.log("TIMING VERIFICATION:");
console.log("First entry:", lines.slice(0, 4).join("\n"));
console.log("\nLast few entries:");
console.log(lines.slice(-20).join("\n"));
