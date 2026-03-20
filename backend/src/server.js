const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jwksRoutes = require("./routes/jwksRoutes");
const authRoutes = require("./routes/authRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const refreshRoutes = require("./routes/refreshRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(jwksRoutes);
app.use(authRoutes);
app.use(tokenRoutes);
app.use(protectedRoutes);
app.use(refreshRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "OAuth Authorization Server Running"
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});