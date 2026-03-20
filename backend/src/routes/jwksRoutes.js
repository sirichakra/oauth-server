const express = require("express");
const router = express.Router();
const jwks = require("../utils/jwks");

router.get("/.well-known/jwks.json", (req, res) => {
  res.json(jwks);
});

module.exports = router;