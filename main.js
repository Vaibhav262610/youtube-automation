const generateScript = require("./script");
const generateVoice = require("./voice");
const renderVideo = require("./render");
const uploadVideo = require("./upload");

const topic = process.argv[2];

async function run() {
  console.log("Generating script...");
  const script = await generateScript(topic);

  console.log("Generating voice...");
  await generateVoice(script);

  console.log("Rendering video...");
  await renderVideo();

  console.log("Uploading...");
  await uploadVideo(topic);

  console.log("Done 🚀");
}

run();
