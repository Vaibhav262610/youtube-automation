const fs = require("fs");

// Parse SRT and create word-by-word animated subtitles with CORRECT timing
function enhanceSubtitles(srtPath) {
    if (!fs.existsSync(srtPath)) {
        console.log("No SRT file found, skipping subtitle enhancement");
        return;
    }

    const content = fs.readFileSync(srtPath, "utf-8");

    // Parse SRT properly
    const subtitles = parseSRT(content);

    let newSRT = "";
    let index = 1;

    subtitles.forEach((subtitle) => {
        const { start, end, text } = subtitle;

        // Clean the text - remove music notes, timestamps, etc.
        const cleanText = text
            .replace(/\d+-second\s+\w+\s+music\)/gi, "")  // Remove music notes
            .replace(/^\d+s-\d+s\)\s*/g, "")  // Remove timestamp prefixes
            .replace(/\(.*?\)/g, "")  // Remove anything in parentheses
            .trim();

        if (!cleanText) return;

        // Split into words
        const words = cleanText.split(/\s+/).filter(w => w.length > 0);
        const duration = end - start;
        const wordDuration = duration / words.length;

        // Create entry for each word
        words.forEach((word, i) => {
            const wordStart = start + (i * wordDuration);
            const wordEnd = wordStart + wordDuration;

            newSRT += `${index}\n`;
            newSRT += `${msToTime(wordStart)} --> ${msToTime(wordEnd)}\n`;
            newSRT += `${word.toUpperCase()}\n\n`;
            index++;
        });
    });

    // Save enhanced SRT
    fs.writeFileSync("output/enhanced.srt", newSRT);
    console.log("✅ Enhanced word-by-word subtitles created");
    console.log(`   Total words: ${index - 1}`);
    return "output/enhanced.srt";
}

// Proper SRT parser
function parseSRT(content) {
    const subtitles = [];
    const blocks = content.trim().split(/\n\s*\n/);

    blocks.forEach((block) => {
        const lines = block.trim().split("\n");
        if (lines.length < 3) return;

        // First line is the index number - skip it
        // Second line is the timing
        const timingLine = lines[1];

        // Third line onwards is the text
        const text = lines.slice(2).join(" ");

        // Parse timing
        if (!timingLine || !timingLine.includes("-->")) return;

        const [startStr, endStr] = timingLine.split("-->").map(s => s.trim());
        const start = timeToMs(startStr);
        const end = timeToMs(endStr);

        subtitles.push({ start, end, text });
    });

    return subtitles;
}

function timeToMs(timeStr) {
    // Format: HH:MM:SS,mmm
    const [time, ms] = timeStr.split(",");
    const [h, m, s] = time.split(":").map(Number);
    return (h * 3600000) + (m * 60000) + (s * 1000) + parseInt(ms || 0);
}

function msToTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor(ms % 1000);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")},${String(milliseconds).padStart(3, "0")}`;
}

module.exports = enhanceSubtitles;
