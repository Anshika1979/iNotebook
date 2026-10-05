import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteItem = ({ note, updateNote }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-4">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>

          <p className="card-text">{note.description}</p>

          <span className="badge bg-primary">{note.tag}</span>

          <div className="mt-3">
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => updateNote(note)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;