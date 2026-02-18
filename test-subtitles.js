// Test subtitle timing
const fs = require("fs");
const enhanceSubtitles = require("./subtitles");

// Create a test SRT file
const testSRT = `1
00:00:00,100 --> 00:00:04,225
This is the first sentence.

2
00:00:04,225 --> 00:00:08,737
This is the second sentence here.

3
00:00:08,737 --> 00:00:14,225
And this is the third one with more words.
`;

fs.writeFileSync("output/test.srt", testSRT);

console.log("Original SRT:");
console.log(testSRT);

enhanceSubtitles("output/test.srt");

console.log("\nEnhanced SRT:");
const enhanced = fs.readFileSync("output/enhanced.srt", "utf-8");
console.log(enhanced.substring(0, 500)); // Show first 500 chars
