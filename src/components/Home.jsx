
import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./Addnote";
import Notes from "./Notes";

const Home = () => {
  const context = useContext(NoteContext);
  const { fetchNotes } = context;

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <AddNote />
      <Notes />
    </div>
  );
};

export default Home;