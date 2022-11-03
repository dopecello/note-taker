const fs = require("fs");
const path = require("path");

const express = require("express");
const { notes } = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML & public files

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Get all notes...

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// Creating new notes ....

app.post("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();
  if (!validateNote(req.body)) {
    res.status(400).send("Please format your note correctly.");
  } else {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
  }
});

function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

// Server initialization...

app.listen(PORT, () => {
  console.log(`Notetaking occurring on port ${PORT}`);
});
