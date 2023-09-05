import { useEffect, useState } from 'react';
import uuid from "react-uuid"
import './App.css';
import Main from './component/Main';
import Sidebar from './component/Sidebar';

function App() {

  const [notes,setNotes] = useState(JSON.parse(localStorage.notes))

  const [activeNote,setActiveNote]= useState()

  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes))
  },[notes])

  const onAddNote =()=>{
    const newArryNote = {
      id:uuid(),
      title:"Untitled NOte",
      body:"",
      lastModified:Date.now(),
    }
    console.log(newArryNote.id)

    setNotes([newArryNote,...notes])
  }

  const onDeleteNote =(idToDelete)=>{
    setNotes(notes.filter((note)=>
      note.id !== idToDelete))
      console.log(idToDelete)
  }

  const getActiveNote =()=>{
    return notes.find((note)=>note.id === activeNote)
  }

  const onUpdateNote=(updatedNote)=>{
    const updateNotesArray = notes.map((note)=>{
      if (note.id === activeNote){
        return updatedNote;
      }

      return note;
    })
    setNotes(updateNotesArray)
  }
  const editField=()=>{
    setNotes()
  }

  
  return (
    <div className="App">
      <Sidebar notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  );
}

export default App;
