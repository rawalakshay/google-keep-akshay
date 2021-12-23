import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
//import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";

function Note(props) {
  return (
    <div className="note">
      <div className="note-content">
        <h1>{props.title}</h1>
        {/* <p>{props.noteID}</p> */}
        <p>{props.content}</p>
      </div>
      <div className="note-icons">
        <button>
          <CircleNotificationsOutlinedIcon fontSize="small" />
        </button>
        <button>
          <GroupsOutlinedIcon fontSize="small" />
        </button>
        <button>
          <ColorLensOutlinedIcon fontSize="small" />
        </button>
        <button>
          <InsertPhotoOutlinedIcon fontSize="small" />
        </button>
        <button>
          <ArchiveOutlinedIcon fontSize="small" />
        </button>
        <button onClick={() => props.deleteNote(props.noteID)}>
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}

export default Note;
