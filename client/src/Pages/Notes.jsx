import React, { useState, useEffect } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import axios from "axios";

function App() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [notes, setNotes] = useState([
    {
      _id: "null-id",
      title: "server-offline",
      content: "server-offline",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then((response) => {
        let data = response.data;
        console.log(data);
        setNotes(data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      //cleanup;
    };
  }, [setNotes]);

  function createNote(event) {
    const { name, value } = event.target;
    setNote((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  }

  function addNote(event) {
    const insertNote = {
      title: note.title,
      content: note.content,
    };

    axios
      .post(`http://localhost:3001/notes`, insertNote)
      .then((res) => console.log("Send from react"));

    setNotes((preState) => {
      return [...preState, insertNote];
    });
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function deleteNote(noteID) {
    axios.delete(`http://localhost:3001/notes/${noteID}`).then(() => {
      axios.get("http://localhost:3001/notes").then((response) => {
        setNotes(response.data);
      });
    });
    console.log("Deleted : " + noteID);
  }

  return (
    <div>
      {/* <Header /> */}
      <CreateArea
        title={note.title}
        content={note.content}
        createNote={createNote}
        addNote={addNote}
      />

      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          noteID={note._id}
          title={note.title}
          content={note.content}
          deleteNote={deleteNote}
        />
      ))}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
