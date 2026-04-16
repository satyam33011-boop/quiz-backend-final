const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Questions
const questions = [
  {question:"2+2=?",options:["2","3","4","5"],answer:"4"},
  {question:"5*3=?",options:["15","10","20","8"],answer:"15"},
  {question:"10/2=?",options:["2","5","10","8"],answer:"5"},
  {question:"√16=?",options:["2","4","8","6"],answer:"4"},
  {question:"7+6=?",options:["12","13","14","15"],answer:"13"},
  {question:"9-3=?",options:["3","6","9","5"],answer:"6"},
  {question:"3^2=?",options:["6","9","3","12"],answer:"9"},
  {question:"12%5=?",options:["2","1","3","4"],answer:"2"},
  {question:"6*6=?",options:["30","36","42","48"],answer:"36"},
  {question:"8+1=?",options:["7","8","9","10"],answer:"9"}
];

// ✅ Only ONE leaderboard
let leaderboard = [];

// Root route
app.get("/", (req, res) => {
  res.send("Quiz Backend is Running 🚀");
});

// Get questions
app.get("/questions", (req, res) => {
  res.json(questions);
});

// Submit quiz
app.post("/submit", (req, res) => {
  const { name, answers, timeTaken } = req.body;

  let score = 0;

  questions.forEach((q, i) => {
    if (q.answer === answers[i]) score++;
  });

  const result = { name, score, timeTaken };

  leaderboard.push(result);

  // Sort leaderboard
  leaderboard.sort((a, b) => {
    if (b.score === a.score) return a.timeTaken - b.timeTaken;
    return b.score - a.score;
  });

  res.json({ score, total: questions.length });
});

// Get leaderboard
app.get("/leaderboard", (req, res) => {
  res.json(leaderboard.slice(0, 10));
});

// ✅ Render port fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
