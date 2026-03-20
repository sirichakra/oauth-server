const express = require("express");
const router = express.Router();

const { authorize } = require("../controllers/authController");

router.get("/authorize", authorize);

module.exports = router;