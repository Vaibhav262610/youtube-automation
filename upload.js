const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config();

async function uploadVideo(title) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    "http://localhost"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  await youtube.videos.insert({
    part: "snippet,status",
    requestBody: {
      snippet: {
        title: title + " #shorts",
        description: "AI Experiment 🚀",
        tags: ["AI", "automation", "shorts"],
      },
      status: {
        privacyStatus: "private", // safer while testing
      },
    },
    media: {
      body: fs.createReadStream("output/final.mp4"),
    },
  });

  console.log("Upload successful 🚀");
}

module.exports = uploadVideo;
