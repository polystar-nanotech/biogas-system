const express = require("express");
const bodyParser = require("body-parser");
import cors from "cors";
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.get("/api/v1", (req, res) => {
  res.send("hello there");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
