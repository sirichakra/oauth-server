const jwt = require("jsonwebtoken");

function refreshToken(req, res) {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(401).json({ error: "missing_refresh_token" });
  }

  try {
    const decoded = jwt.verify(refresh_token, "refresh_secret");

    const newAccessToken = jwt.sign(
      { user: decoded.user },
      "secret_key",
      { expiresIn: "15m" }
    );

    return res.json({
      access_token: newAccessToken,
      token_type: "Bearer"
    });

  } catch (err) {
    return res.status(403).json({ error: "invalid_refresh_token" });
  }
}

module.exports = { refreshToken };