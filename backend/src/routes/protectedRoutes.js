const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

router.get("/profile", authenticate, (req, res) => {

  res.json({
    message: "Protected data accessed",
    user: req.user
  });

});

module.exports = router;