const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const scoresRoute = require("./routes/scores");
app.use("/scores", scoresRoute);

app.get("/", (req, res) => {
  res.json({ message: "no place like home" });
});

mongoose.connect(process.env.DB, { useNewUrlParser: true }, () =>
  console.log("connected to DB bby")
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
