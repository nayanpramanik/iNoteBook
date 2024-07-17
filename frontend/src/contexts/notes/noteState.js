import { useState } from 'react';
import NoteContext from './noteContext'

const Notestate = (props) => {
    const host = "https://backend-inotes.onrender.com";
    //const host = "http://localhost:5000";

    const noteInitial = [];

    const [notes, setNotes] = useState(noteInitial);

    //fetching all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
        });

        const json = await response.json();
        console.log(json);
        setNotes(json);

    }

    //Adding new note functionality
    const addNote = async (title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });


        console.log("Adding new note");
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    //Deleting a note
    const deleteNote = async (id) => {
        //  API call
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        })
        console.log("Deleting a note with " + id);
        console.log(response.json());
        const newNotes = notes.filter((note) => { return note._id !== id })

        setNotes(newNotes);
    }
    //EDIT a note
    const editNote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });

        // eslint-disable-next-line
        const json = response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, getNotes, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default Notestate;