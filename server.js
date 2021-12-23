const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const connectDB = require("./db.js");
const { path } = require("express/lib/application");

const app = express();
const port = 3001;

app.use(express.static(path.resolve(__dirname + "./client/build")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

connectDB();

//mongoose.connect("mongodb://localhost:27017/keepDB");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

app
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

app
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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "./client/build", "index.html"))
})

app.get("/", (req, res) => {
  res.send(`<h1><a href="/notes"> notes </a></h1>`);
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running at port : ${port} `);
});
