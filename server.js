const express = require("express");
const notes = require("./db/db.json")
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

app.listen(PORT, () => {
  console.log(`Notetaking occurring on port ${PORT}`);
});
