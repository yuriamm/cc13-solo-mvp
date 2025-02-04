const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./db");
const app = express();

// Setup Logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.use(express.json());

app.get("/api/questions", async (req, res) => {
  try {
    if (!req.query.keyword) {
      const questions = await db.select().table("faqs");
      res.json(questions);
    } else {
      const keyword = req.query.keyword;
      console.log("this is", keyword);
      const questions = await db
        .where("question", "like", `%${keyword}%`)
        .select()
        .table("faqs");
      res.json(questions);
    }
  } catch (err) {
    console.error("Error loading questions!", err);
    res.sendStatus(500);
  }
});

app.get("/api/questions/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const questions = await db
      .where("id", id)
      .select()
      .table("faqs");
    res.json(questions);
  } catch (err) {
    console.error("Error loading questions!", err);
    res.sendStatus(500);
  }
});

app.post("/add", async (req, res) => {
  try {
    const questions = req.body;
    const question = questions.question;
    await db("faqs").insert({ question });
    res.json(questions);
  } catch (err) {
    console.error("Error loading questions!", err);
    res.sendStatus(500);
  }
});

app.delete(`/questions/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    await db("faqs")
      .where("id", id)
      .del();
    res.json();
  } catch (err) {
    console.error("Error deleting questions!", err);
    res.sendStatus(500);
  }
});

app.put("/questions/:id", async (req, res) => {
  console.log(req.body, req.params.id);
  try {
    const id = req.params.id;
    const question = req.body;
    await db("faqs")
      .where("id", id)
      .update(question);
    res.json();
  } catch (err) {
    console.error("Error updating questions!", err);
    res.sendStatus(500);
  }
});

// Always return the main index.html, since we are developing a single page application
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
});

module.exports = app;
