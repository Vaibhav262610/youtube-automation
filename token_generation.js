const axios = require("axios");

const data = new URLSearchParams({
  client_id: "624935936872-3auss7c3sh1n8tqqmcpf6rv0sfm1kdm2.apps.googleusercontent.com",
  client_secret: "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",
  code: "4/0AfrIepC6-EWc22WJKrjCAyQOae6YJv6w0S3a1gH2LI-yr8c3nOAJlP6pH_Rvoieu2yvXEg",
  grant_type: "authorization_code",
  redirect_uri: "http://localhost:3000/callback",
});

axios.post("https://oauth2.googleapis.com/token", data)
  .then(res => console.log(res.data))
  .catch(err => console.log(err.response.data));
