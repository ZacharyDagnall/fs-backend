const express = require("express");
const router = express.Router();
const Score = require("../models/Score");

// router.get("/bingo", (req, res) => {
//   res.json({ message: "bongo" });
// });

router.get("/", async (req, res) => {
  try {
    let scores = await Score.find();
    scores = scores.sort((a, b) => b.score - a.score);
    res.json(scores);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const score = new Score({
    name: req.body.name,
    score: req.body.score,
  });
  try {
    const savedScore = await score.save();
    res.json(savedScore);
  } catch (error) {
    res.json({ message: error });
  }
});

function leaderboard(scores) {
  scores = scores.sort((a, b) => b.score - a.score);
  let leaderboard = [{ rank: 1, name: scores[0].name, score: scores[0].score }];
  const rankIndices = [1, 2, 3, 5, 8, 13, 21];
  for (let i = 0; i < rankIndices.length; i++) {
    if (rankIndices[i] < scores.length)
      leaderboard.push({
        rank: rankIndices[i],
        name: scores[rankIndices[i] - 1].name,
        score: scores[rankIndices[i] - 1].score,
      });
  }
  return leaderboard;
}

router.get("/leaderboard", async (req, res) => {
  try {
    let scores = await Score.find();
    const leaders = leaderboard(scores);
    res.json(leaders);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/scoreToBeat", async (req, res) => {
  try {
    let scores = await Score.find();

    let stb;
    let i = 20;
    do {
      if (scores[i]) {
        stb = scores[i];
      } else {
        i--;
      }
    } while (!scores[i]);

    res.json(stb);
  } catch (error) {
    res.json({ message: error });
  }
});

// router.get("/:id", (req, res) => {
//   res.send("bingo" + req.params.id);
// });

module.exports = router;
