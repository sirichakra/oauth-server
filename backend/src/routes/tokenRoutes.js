const express = require("express");
const router = express.Router();

const { exchangeToken } = require("../controllers/tokenController");

router.post("/token", exchangeToken);

module.exports = router;