const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const comicsRouter = require("./routes/Routers");

const app = express();

app.use(express.json());
app.use(cors());
app.use(comicsRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found." });
});

app.listen(process.env.PORT, () => {
  console.log("🔥 server started 🔥");
});
