const axios = require("axios");
const fs = require("fs");

// Generate multiple UNIQUE stock images
async function generateImages(script) {
    console.log("🎨 Generating UNIQUE stock images...");

    // Clean and create images directory
    const imagesDir = "output/images";
    if (fs.existsSync(imagesDir)) {
        const oldImages = fs.readdirSync(imagesDir);
        oldImages.forEach(file => {
            fs.unlinkSync(`${imagesDir}/${file}`);
        });
    } else {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Split script into sentences
    const sentences = script
        .split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 10);

    console.log(`   Found ${sentences.length} scenes to visualize`);

    const images = [];
    const usedIds = new Set();

    // Generate UNIQUE image for each sentence (max 10)
    for (let i = 0; i < Math.min(sentences.length, 10); i++) {
        try {
            const keywords = extractKeywords(sentences[i]);
            const img = await generateImageForScene(keywords, i, usedIds);
            if (img) {
                images.push(img);
                console.log(`   ✓ Scene ${i + 1} saved (ID: ${img.id})`);
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
            console.log(`   ⚠️  Scene ${i + 1} failed, skipping...`);
        }
    }

    if (images.length > 0) {
        console.log(`✅ Generated ${images.length} UNIQUE images!`);
    } else {
        console.log("⚠️  No images generated");
    }

    return images;
}

// Extract keywords
function extractKeywords(sentence) {
    const text = sentence.toLowerCase();

    const keywordMap = {
        'ai': 'artificial intelligence technology',
        'money': 'money cash wealth',
        'rich': 'luxury success wealth',
        'business': 'business office entrepreneur',
        'online': 'laptop computer technology',
        'success': 'success achievement winning',
        'future': 'future innovation technology',
        'crypto': 'cryptocurrency bitcoin finance',
        'job': 'office work professional',
        'work': 'workspace office desk',
        'learn': 'education learning books',
        'free': 'freedom nature happy',
        'secret': 'mystery exclusive luxury',
        'fast': 'speed fast motion',
        'make': 'create build success',
        'earn': 'money income profit',
        'get': 'success achievement goal'
    };

    for (const [key, value] of Object.entries(keywordMap)) {
        if (text.includes(key)) {
            return value;
        }
    }

    return 'business success professional';
}

// Generate UNIQUE image - NO REPEATS
async function generateImageForScene(keywords, index, usedIds) {
    try {
        // Use different ID ranges for each scene to guarantee uniqueness
        const imageIdRanges = [
            [1, 50],      // Scene 0
            [51, 100],    // Scene 1
            [101, 150],   // Scene 2
            [151, 200],   // Scene 3
            [201, 250],   // Scene 4
            [251, 300],   // Scene 5
            [301, 350],   // Scene 6
            [351, 400],   // Scene 7
            [401, 450],   // Scene 8
            [451, 500]    // Scene 9
        ];

        const range = imageIdRanges[index % imageIdRanges.length];
        let imageId;

        // Keep trying until we get a unique ID
        do {
            imageId = Math.floor(Math.random() * (range[1] - range[0])) + range[0];
        } while (usedIds.has(imageId));

        usedIds.add(imageId);

        const imageUrl = `https://picsum.photos/id/${imageId}/1080/1920.jpg`;

        console.log(`   Downloading scene ${index + 1}: ${keywords}...`);

        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            timeout: 8000,
            maxRedirects: 3,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        const imagePath = `output/images/scene_${index}.jpg`;
        fs.writeFileSync(imagePath, response.data);

        return {
            path: imagePath,
            keywords: keywords,
            index,
            id: imageId
        };
    } catch (error) {
        console.error(`   ✗ Failed scene ${index + 1}:`, error.message);
        return null;
    }
}

module.exports = generateImages;
