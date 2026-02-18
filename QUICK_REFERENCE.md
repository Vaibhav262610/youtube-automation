# Quick Reference Guide

## Generate Video

```bash
node main.js "your topic"
```

## Adjust Voice Speed

Edit `voice.js` line 17:

```javascript
"--rate",
"+20%",  // Faster: +30%, +40% | Slower: +10%, +0%
```

## Change Voice

Edit `voice.js` line 15:

```javascript
"en-IN-PrabhatNeural",  // Current: Male, professional
// "en-IN-NeerjaNeural",  // Female, warm
// "en-IN-AaravNeural",   // Male, energetic
```

## Adjust Audio Volumes

Edit `render.js` line 35:

```javascript
"[0:a]volume=0.15[bg]"; // Background music (0.15 = 15%)
"[1:a]volume=2.5[voice]"; // Voiceover (2.5 = 250%)
```

## Adjust Subtitle Style

Edit `render.js` lines 18-27:

```javascript
("Fontsize=40", // Size: 30-50
	"PrimaryColour=&H00FFFFFF&", // White
	"Outline=4", // Outline thickness: 2-6
	"MarginV=200"); // Position from top: 100-400
```

## Subtitle Position Options

```javascript
"Alignment=10"; // Top center (current)
"Alignment=2"; // Bottom center
"Alignment=5"; // Middle center
```

## Common Issues

### Subtitles not syncing?

- Check `output/voice.srt` exists
- Check `output/enhanced.srt` has proper timing
- Run: `node test-srt-fix.js` to test parser

### Voice too fast/slow?

- Adjust `--rate` in `voice.js`
- Range: -50% to +100%
- Recommended: +15% to +30%

### No audio?

- Check `output/voice.mp3` exists
- Verify FFmpeg is installed
- Check audio mixing in `render.js`

### Background music too loud?

- Lower volume in `render.js`: `volume=0.10` or `0.05`

### Voiceover too quiet?

- Increase volume in `render.js`: `volume=3.0` or `3.5`

## File Structure

```
├── main.js           # Main orchestration
├── script.js         # AI script generation
├── voice.js          # Text-to-speech
├── subtitles.js      # Subtitle enhancement
├── render.js         # Video rendering
├── assets/
│   ├── background.mp4
│   └── font.ttf
└── output/
    ├── voice.mp3
    ├── voice.srt
    ├── enhanced.srt
    └── final.mp4
```

## Customization Examples

### Make voice even faster:

```javascript
// voice.js line 17
("--rate", "+35%");
```

### Bigger subtitles:

```javascript
// render.js line 20
"Fontsize=50";
```

### Yellow subtitles (like MrBeast):

```javascript
// render.js line 22
"PrimaryColour=&H0000FFFF&"; // Yellow
```

### Bottom subtitles:

```javascript
// render.js line 27
("Alignment=2", "MarginV=100");
```

### Louder background music:

```javascript
// render.js line 35
"[0:a]volume=0.25[bg]";
```

## Testing

```bash
# Test subtitle parser
node test-srt-fix.js

# Clean output
Remove-Item output\* -Force

# Generate video
node main.js "test topic"
```
