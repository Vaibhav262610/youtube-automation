const { google } = require("googleapis");
const readline = require("readline");

const oauth2Client = new google.auth.OAuth2(
  "YOUR_CLIENT_ID",
  "YOUR_CLIENT_SECRET",
  "http://localhost"
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/youtube.upload"],
});

console.log("Authorize this app by visiting this url:\n", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from that page here: ", async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  console.log("\nYour REFRESH TOKEN:\n", tokens.refresh_token);
  rl.close();
});
