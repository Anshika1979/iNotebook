import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
;

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check whether user is logged in
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (!token) {
      setMessage("Please log in before adding a note.");
      return;
    }

    // Check required fields
    if (note.title.trim().length < 3) {
      setMessage("Title must be at least 3 characters.");
      return;
    }

    if (note.description.trim().length < 5) {
      setMessage("Description must be at least 5 characters.");
      return;
    }

    try {
      await addNote(
        note.title,
        note.description,
        note.tag
      );

      // Clear form
      setNote({
        title: "",
        description: "",
        tag: ""
      });

      setMessage("Note added successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Unable to add note.");
    }
  };

  return (
    <div className="container my-3">

      <h2>Add a Note</h2>

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>

          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter note title"
            value={note.title}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            placeholder="Enter note description"
            value={note.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Tag */}
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>

          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="Enter tag"
            value={note.tag}
            onChange={handleChange}
          />
        </div>

        {/* Add Note button */}
        <button disabled={note.title.trim().length < 3 || note.description.trim().length < 5}
          type="submit"
          className="btn btn-primary"
        >
          Add Note
        </button>

      </form>

      {/* Message */}
      {message && (
        <div className="mt-3">
          {message}
        </div>
      )}

    </div>
  );
};

export default AddNote;