# Voice Options Guide

## Current Setup

- **ElevenLabs**: Rachel (energetic female) - ID: `21m00Tcm4TlvDq8ikWAM`
- **Fallback**: Jenny (US female) - energetic and expressive

## Available ElevenLabs Voices (Popular)

### Female Voices

- **Rachel** (21m00Tcm4TlvDq8ikWAM) - Young, energetic ✅ CURRENT
- **Bella** (EXAVITQu4vr4xnSDxMaL) - Soft, calm
- **Elli** (MF3mGyEYCl7XYWbV9V6O) - Emotional, expressive
- **Domi** (AZnzlk1XvdvUeBnXmlld) - Strong, confident

### Male Voices

- **Adam** (pNInz6obpgDQGcFmaJgB) - Deep, authoritative
- **Antoni** (ErXwobaYiN019PkySvjV) - Well-rounded, versatile
- **Josh** (TxGEqnHWrfWFTfGW9XjX) - Young, energetic
- **Arnold** (VR6AewLTigWG4xSOukaG) - Crisp, clear

### Character/Game Voices

- **Clyde** (2EiwWnXFnvU5JabPnv8n) - Video game character
- **Glinda** (z9fAnlkpzviPz146aGWa) - Witch-like, mystical

## Edge-TTS Voices (Free Fallback)

### Energetic Female

- **en-US-JennyNeural** - Friendly, energetic ✅ CURRENT FALLBACK
- **en-US-AriaNeural** - Expressive, dynamic
- **en-US-SaraNeural** - Young, casual

### Character Voices

- **en-US-GuyNeural** - Newsreader style
- **en-GB-SoniaNeural** - British, professional

## How to Change Voice

### For ElevenLabs (voice.js line 18):

```javascript
const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Change this ID
```

### For Edge-TTS (voice.js line 62):

```javascript
"--voice",
"en-US-JennyNeural", // Change this name
```

## Voice Settings

### Speed

- Current: `+25%` (fast, energetic)
- Options: `+0%` (normal), `+50%` (very fast), `-10%` (slower)

### Pitch (Edge-TTS only)

- Current: `+5Hz` (slightly higher)
- Options: `+0Hz` (normal), `+10Hz` (higher), `-5Hz` (lower)

## Testing Voices

Run: `node main.js "test topic"` to generate a video with current voice
settings.
