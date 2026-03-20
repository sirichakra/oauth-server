const express = require("express");
const router = express.Router();

const { refreshToken } = require("../controllers/refreshController");

router.post("/refresh", refreshToken);

module.exports = router;