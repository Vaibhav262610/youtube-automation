# YouTube Shorts Video Automation

Automatically generate professional YouTube Shorts videos with AI script, Indian
voiceover, word-by-word animated subtitles, and background music.

## Features

✅ AI-generated scripts (20 seconds, 35 words max) ✅ Indian English voiceover
(natural accent) ✅ Word-by-word animated subtitles (like professional YouTube
Shorts) ✅ Background music from video ✅ Professional video quality (1080x1920)
✅ Automatic audio mixing

## Usage

```bash
node main.js "your topic"
```

### Examples:

```bash
node main.js "future of AI"
node main.js "climate change solutions"
node main.js "productivity tips"
```

## Output

- Video: `output/final.mp4`
- Audio: `output/voice.mp3`
- Subtitles: `output/voice.srt` and `output/enhanced.srt`

## Voice Options

Current voice: **en-IN-PrabhatNeural** (Indian male, professional)

To change voice, edit `voice.js` line 15:

**Available Indian voices:**

- `en-IN-PrabhatNeural` - Male, clear and professional
- `en-IN-NeerjaNeural` - Female, warm and friendly
- `en-IN-AaravNeural` - Male, young and energetic

## How It Works

1. **Script Generation** (`script.js`)
   - Uses Groq AI to generate engaging 20-second scripts
   - Optimized for YouTube Shorts format

2. **Voice Generation** (`voice.js`)
   - Converts script to speech using edge-tts
   - Indian English accent for natural delivery
   - Generates SRT subtitles automatically

3. **Subtitle Enhancement** (`subtitles.js`)
   - Splits sentences into word-by-word captions
   - Maintains proper timing from original SRT
   - Creates animated effect like professional videos

4. **Video Rendering** (`render.js`)
   - Combines background video, voiceover, and music
   - Adds word-by-word subtitles with professional styling
   - Outputs high-quality 1080x1920 vertical video

## Technical Details

### Audio Mixing:

- Background music: 15% volume
- Voiceover: 250% volume (clear and prominent)
- Smooth mixing with dropout transition

### Subtitle Styling:

- Font: Impact (bold, professional)
- Size: 40px
- Color: White with black outline
- Position: Top-center
- Animation: Word-by-word appearance

### Video Quality:

- Resolution: 1080x1920 (9:16 aspect ratio)
- Codec: H.264
- Preset: Medium (balanced quality/speed)
- CRF: 23 (high quality)

## Requirements

- Node.js
- Python with edge-tts (`pip install edge-tts`)
- FFmpeg
- Groq API key (in `.env` file)

## Files

- `main.js` - Main orchestration
- `script.js` - AI script generation
- `voice.js` - Text-to-speech with Indian accent
- `subtitles.js` - Word-by-word subtitle enhancement
- `render.js` - FFmpeg video rendering
- `assets/background.mp4` - Background video
- `assets/font.ttf` - Font file

## Troubleshooting

**No subtitles showing?**

- Check if `output/voice.srt` exists
- Verify subtitle timing in `output/enhanced.srt`

**No audio?**

- Check if `output/voice.mp3` exists
- Verify FFmpeg audio mixing command

**Subtitles appear too fast?**

- The subtitle timing is synced with the voiceover
- Check the original SRT file timing

## Tips

- Keep topics short and punchy for best results
- The AI generates hook-first scripts for engagement
- Background music volume is intentionally low
- Word-by-word subtitles create professional look
