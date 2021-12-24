const express = require("express");
const router = express.Router();

const Note = require("../models/note");

router
  .route("/notes")
  .get((req, res) => {
    Note.find({}, (error, data) => {
      res.send(data);
    });
  })
  .post((req, res) => {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
    });

    note.save((error) => {
      if (!error) {
        res.send("Posted Successfully!");
      } else res.send(error);
    });
  });

router
  .route("/notes/:id")
  .get((req, res) => {
    const noteID = req.params.id;
    Note.findOne({ _id: noteID }, (error, data) => {
      console.log(data);
      if (data !== null) {
        if (!error) {
          res.send(data);
        } else {
          res.send(error);
        }
      } else res.send("Data is Null");
    });
  })
  .put((req, res) => {
    //get id
    const noteID = req.params.id;
    Note.findOne({ _id: noteID }, (error, data) => {
      if (data !== undefined && data !== null) {
        Note.updateOne(
          { _id: noteID }, //find id
          { title: req.body.title, content: req.body.content }, //update title/content
          (error, data) => {
            if (!error) {
              res.send("Updated Successfully");
            } else res.send(error);
          }
        );
      } else if (data === undefined || data === null) {
        const note = new Note({
          title: req.body.title,
          content: req.body.content,
        });

        note.save((error) => {
          if (!error) {
            res.send("Posted Successfully!");
          } else res.send(error);
        });
      } else res.send(error);
    });
  })
  .delete((req, res) => {
    const noteID = req.params.id;
    Note.deleteOne({ _id: noteID }, (error, data) => {
      if (!error) {
        res.send(`Deleted note : ${noteID}`);
      } else {
        res.send(error);
      }
    });
  });

module.exports = router;
