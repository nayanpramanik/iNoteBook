import React, { useContext, useState } from 'react'
import noteContext from '../contexts/notes/noteContext';



const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();

        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added note successfully", "success");

    }


    return (
        <div className="container my-3">
            <div className="row justify-content-center" >
                <div className="col-md-6 col-sm-12">
                    <h4 className="display-6"> Add a note</h4>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control rounded-pill" id="title" name="title" placeholder="Min Length 5" aria-describedby="title" value={note.title} onChange={onChange} minLength={5} required />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control rounded-pill" id="descripton" name="description" placeholder="Min Length 5" onChange={onChange} value={note.description} minLength={5} required />
                        </div>
                        <div className="mb-3 ">
                            <label className="form-label" htmlFor="tag">Tags : </label>
                            <input type="text" className="form-control rounded-pill" id="tag" name="tag" value={note.tag} onChange={onChange} />

                        </div>
                        <button className="btn btn-dark" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNote;
