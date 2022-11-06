const { notes } = require("../../db/db.json");
const { validateNote, createNewNote } = require("../../lib/notes");
const router = require("express").Router();

// Get all notes...

router.get("/notes", (req, res) => {
  res.json(notes);
});

// Creating new notes ....

router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();
  if (!validateNote(req.body)) {
    res.status(400).send("Please format your note correctly.");
  } else {
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
  }
});

module.exports = router;
