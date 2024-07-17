const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
let fetchuser = require("../Middleware/fetchUser");
const Note = require("../Models/Notes");

//Route 1 for fetching (get) all notes of a user (Login required)

router.get("/fetchNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error ");
  }
});

// Route 2 for creating(post) a note (Login reqd.)

router.post(
  "/addNote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error ");
    }
  }
);

// Route 3 for updating an existing note (login reqd)

router.put("/updateNote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //checking if the note exists or not
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note doesn't exists");
    }

    //verifying of the user is autherized or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("User not valid");
    }

    // if note exists and accessed by valid user
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// route 4 for deleting notes (login reqd)

router.delete("/deleteNote/:id", fetchuser, async (req, res) => {
  try {
    //checking if the note exists or not
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note doesn't exists");
    }

    //verifying of the user is autherized or not
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("User not valid");
    }

    // if note exists and accessed by valid user
    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ "Success:": "Deleted the note ", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error ");
  }
});

module.exports = router;
