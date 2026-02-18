const fs = require("fs");
const enhanceSubtitles = require("./subtitles");

// Create test SRT that matches the actual format
const testSRT = `1
00:00:00,100 --> 00:00:04,412
2-second intro music)  Think 2050.

2
00:00:04,362 --> 00:00:07,437
We're in virtual reality cities.

3
00:00:07,437 --> 00:00:10,425
Self-driving cars are the norm.

4
00:00:10,425 --> 00:00:13,787
AI is our assistant and teacher.
`;

// Ensure output directory exists
if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
}

fs.writeFileSync("output/test.srt", testSRT);

console.log("=== ORIGINAL SRT ===");
console.log(testSRT);

enhanceSubtitles("output/test.srt");

console.log("\n=== ENHANCED SRT (first 20 entries) ===");
const enhanced = fs.readFileSync("output/enhanced.srt", "utf-8");
const lines = enhanced.split("\n");
console.log(lines.slice(0, 80).join("\n"));

console.log("\n=== TIMING CHECK ===");
console.log("First word should start at: 00:00:00,100");
console.log("Last word of first sentence should end around: 00:00:04,412");
