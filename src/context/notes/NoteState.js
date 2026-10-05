
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  // Match the port in backend/index.js
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const response = await fetch(
        `${host}/api/notes/fetchallnotes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const json = await response.json();
      console.log("Fetched notes:", json);

      if (!response.ok) {
        throw new Error(json.error || "Failed to fetch notes");
      }

      setNotes(Array.isArray(json) ? json : json.notes || []);
    } catch (error) {
      console.error("Fetch notes error:", error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      console.log("Stored Token:", localStorage.getItem("token"));

      const json = await response.json();
      console.log("Add note response:", json);
      if (!response.ok) {
        throw new Error(json.error || "Failed to add note");
      }

      const newNote = json.note || json;

      if (newNote && newNote._id) {
        setNotes((previousNotes) => [...previousNotes, newNote]);
      } else {
        await fetchNotes();
      }

      return true;
    } catch (error) {
      console.error("Add note error:", error);
      return false;
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(
        `${host}/api/notes/deletenote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to delete note");
      }

      setNotes((previousNotes) =>
        previousNotes.filter((note) => note._id !== id)
      );

      return true;
    } catch (error) {
      console.error("Delete note error:", error);
      return false;
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(
        `${host}/api/notes/updatenote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description, tag }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to edit note");
      }

      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note._id === id
            ? { ...note, title, description, tag }
            : note
        )
      );

      return true;
    } catch (error) {
      console.error("Edit note error:", error);
      return false;
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        fetchNotes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;