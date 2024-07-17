import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contexts/notes/noteContext'
import { Noteitem, AddNote } from './'
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();

        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const closeRef = useRef(null);

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();

        console.log("Updating the note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Updated the note ", "success");
        closeRef.current.click();
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="title" value={note.etitle} onChange={onChange} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescripton" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3 ">
                                    <label className="form-label" htmlFor="tag">Tags : </label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />

                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="row my-3" >
                    {notes.length === 0 && "No notes to display"}
                    {notes.map((note) => {
                        return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
