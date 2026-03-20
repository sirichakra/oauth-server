const fs = require("fs");
const path = require("path");
const pem2jwk = require("rsa-pem-to-jwk");

// correct absolute path
const publicKeyPath = path.join(__dirname, "../keys/public.pem");

const publicKey = fs.readFileSync(publicKeyPath);

const jwk = pem2jwk(publicKey, { use: "sig" }, "public");

jwk.kid = "oauth-key-1";
jwk.alg = "RS256";

module.exports = {
  keys: [jwk]
};