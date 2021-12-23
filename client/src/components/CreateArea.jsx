import React, { useState } from "react";
//import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
//import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [isExpand, setExpand] = useState(false);

  function expand() {
    setExpand(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpand ? (
          <input
            onChange={props.createNote}
            value={props.title}
            name="title"
            placeholder="Title"
          />
        ) : null}
        <textarea
          onChange={props.createNote}
          value={props.content}
          name="content"
          onClick={expand}
          placeholder="Take a note..."
          rows={isExpand ? 3 : 1}
        />
        <div className="addButton">
          <Zoom in={isExpand ? true : false}>
            <Button className="add" variant="text" onClick={props.addNote}>
              Add
            </Button>
          </Zoom>
        </div>
      </form>
    </div>
  );
}

export default CreateArea;
