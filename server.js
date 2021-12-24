const express = require("express");
const cors = require("cors");
const path = require("path");
require("./db.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//API
const notes = require("./api/notes");
app.use("/api", notes);

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build"));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running at port : ${port} `);
});
