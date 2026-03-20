const crypto = require("crypto");
const pool = require("../db/postgres");
const jwt = require("jsonwebtoken");

function base64url(input) {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function exchangeToken(req, res) {
  const { code, code_verifier } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM auth_codes WHERE code = $1",
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "invalid_code" });
    }

    const authCode = result.rows[0];

    let expectedChallenge;

    if (authCode.code_challenge_method === "plain") {
      expectedChallenge = code_verifier;
    } else if (authCode.code_challenge_method === "S256") {
      const hash = crypto.createHash("sha256").update(code_verifier).digest();
      expectedChallenge = base64url(hash);
    } else {
      return res.status(400).json({ error: "invalid_challenge_method" });
    }

    if (expectedChallenge !== authCode.code_challenge) {
      return res.status(400).json({ error: "invalid_code_verifier" });
    }

    // 🔥 FIX — GENERATE TOKEN HERE (inside function)
    const accessToken = jwt.sign(
      { user: "demo_user" },
      "secret_key",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
  { user: "demo_user" },
  "refresh_secret",
  { expiresIn: "7d" }
);

    return res.json({
  access_token: accessToken,
  refresh_token: refreshToken,
  token_type: "Bearer"
});

  } catch (err) {
    console.error("TOKEN ERROR:", err);
    res.status(500).json({ error: "server_error" });
  }
}

module.exports = { exchangeToken };