import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(NoteContext);

  const {
    notes,
    fetchNotes,
    editNote
  } = context;

  // State for editing note
  const [editNoteData, setEditNoteData] = useState({
    id: "",
    title: "",
    description: "",
    tag: ""
  });

  const [showEditForm, setShowEditForm] = useState(false);

  // Fetch notes
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
    }
  }, []);

  // Open edit form
  const updateNote = (note) => {
    setEditNoteData({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag
    });

    setShowEditForm(true);
  };

  // Handle input change
  const handleChange = (e) => {
    setEditNoteData({
      ...editNoteData,
      [e.target.name]: e.target.value
    });
  };

  // Update note
  const handleUpdate = async (e) => {
    e.preventDefault();

    await editNote(
      editNoteData.id,
      editNoteData.title,
      editNoteData.description,
      editNoteData.tag
    );

    setShowEditForm(false);

    // Refresh notes
    fetchNotes();
  };

  return (
    <>
      <div className="container my-3">
        <h2>Your Notes</h2>

        <div className="row">
          {notes.length === 0 ? (
            <p>No notes to display</p>
          ) : (
            notes.map((note) => {
              return (
                <Noteitem
                  key={note._id}
                  note={note}
                  updateNote={updateNote}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Edit Note Form */}
      {showEditForm && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  Edit Note
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditForm(false)}
                ></button>
              </div>

              <form onSubmit={handleUpdate}>

                <div className="modal-body">

                  {/* Title */}
                  <div className="mb-3">
                    <label
                      htmlFor="editTitle"
                      className="form-label"
                    >
                      Title
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="editTitle"
                      name="title"
                      value={editNoteData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label
                      htmlFor="editDescription"
                      className="form-label"
                    >
                      Description
                    </label>

                    <textarea
                      className="form-control"
                      id="editDescription"
                      name="description"
                      value={editNoteData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Tag */}
                  <div className="mb-3">
                    <label
                      htmlFor="editTag"
                      className="form-label"
                    >
                      Tag
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="editTag"
                      name="tag"
                      value={editNoteData.tag}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditForm(false)}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Update Note
                  </button>

                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;