const fs = require("fs");

// Create VIRAL YOUTUBE style captions - word by word highlighting
function createViralCaptions(srtPath) {
    if (!fs.existsSync(srtPath)) {
        console.log("No SRT file found");
        return null;
    }

    const content = fs.readFileSync(srtPath, "utf-8");
    const subtitles = parseSRT(content);

    // Create ASS format for word-by-word highlighting
    let ass = createASSHeader();

    subtitles.forEach((subtitle) => {
        const { start, end, text } = subtitle;

        // Clean text
        const cleanText = text
            .replace(/\d+-second\s+\w+\s+music\)/gi, "")
            .replace(/^\d+s-\d+s\)\s*/g, "")
            .replace(/\(.*?\)/g, "")
            .trim();

        if (!cleanText) return;

        // Split into words
        const words = cleanText.split(/\s+/).filter(w => w.length > 0);
        const duration = end - start;
        const wordDuration = duration / words.length;

        // Create word-by-word captions with CURRENT WORD HIGHLIGHTED
        words.forEach((word, i) => {
            const wordStart = start + (i * wordDuration);
            const wordEnd = wordStart + wordDuration;

            // Show 2-3 words at a time, highlight current word in YELLOW
            const caption = buildWordCaption(words, i);
            ass += createCaptionEntry(caption, wordStart, wordEnd);
        });
    });

    fs.writeFileSync("output/captions.ass", ass);
    console.log("✅ Viral YouTube style captions created!");
    return "output/captions.ass";
}

function createASSHeader() {
    return `[Script Info]
Title: INSANE Viral Captions
ScriptType: v4.00+
WrapStyle: 0
PlayResX: 1080
PlayResY: 1920
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Impact,90,&H00FFFFFF,&H00FFFFFF,&H00000000,&HC0000000,-1,0,0,0,100,100,3,0,1,6,4,5,30,30,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;
}

function buildWordCaption(words, currentIndex) {
    // Show 2-3 words with INSANE highlight on current word
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(words.length, currentIndex + 2);
    const visibleWords = words.slice(start, end);

    let caption = "";
    visibleWords.forEach((word, i) => {
        const actualIndex = start + i;
        if (actualIndex === currentIndex) {
            // Current word in BRIGHT YELLOW with HUGE scale
            caption += `{\\c&H00FFFF&\\fscx120\\fscy120\\b1\\bord7}${word.toUpperCase()}{\\r} `;
        } else {
            // Other words in WHITE, smaller
            caption += `{\\c&HFFFFFF&\\fscx90\\fscy90\\alpha&H40&}${word.toUpperCase()} `;
        }
    });

    return caption.trim();
}

function createCaptionEntry(text, startMs, endMs) {
    const start = msToASSTime(startMs);
    const end = msToASSTime(endMs);

    // INSANE pop-in effect with bounce
    return `Dialogue: 0,${start},${end},Default,,0,0,0,,{\\fad(20,20)\\t(0,80,\\fscx130\\fscy130)\\t(80,150,\\fscx100\\fscy100)}${text}\n`;
}

function parseSRT(content) {
    const subtitles = [];
    const blocks = content.trim().split(/\n\s*\n/);

    blocks.forEach((block) => {
        const lines = block.trim().split("\n");
        if (lines.length < 3) return;

        const timingLine = lines[1];
        const text = lines.slice(2).join(" ");

        if (!timingLine || !timingLine.includes("-->")) return;

        const [startStr, endStr] = timingLine.split("-->").map(s => s.trim());
        const start = timeToMs(startStr);
        const end = timeToMs(endStr);

        subtitles.push({ start, end, text });
    });

    return subtitles;
}

function timeToMs(timeStr) {
    const [time, ms] = timeStr.split(",");
    const [h, m, s] = time.split(":").map(Number);
    return (h * 3600000) + (m * 60000) + (s * 1000) + parseInt(ms || 0);
}

function msToASSTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

module.exports = createViralCaptions;
