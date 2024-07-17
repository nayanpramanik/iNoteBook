import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import logo2 from '../utils/iNotes_Logo.png'
import logo3 from '../utils/Notebook.gif'

const Welcome = () => {
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/home")

        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container-fluid" style={{ marginTop: "-8vh" }}>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 text-center">

                <div className="col " style={{ height: "90vh" }}>
                    <h2 className="display-2"> iNotes</h2>
                    <p className="display-6 typewriter"> Take Notes <br />store pointers  <br />tag your notes <br />or <p >anything worth remembering!!! </p></p>
                    <img src={logo3} className="img-fluid " style={{ maxHeight: "50%", marginTop: "-20px" }} alt="notes" />
                </div>



                <div className="col text-center" style={{ backgroundColor: "#dcdcdc", height: "90vh" }}>
                    <div className="d-flex flex-column justify-content-start" style={{ height: "inherit" }} >
                        <div>
                            <h4 className="display-6"> Get started with iNotes</h4>
                            <img src={logo2} style={{ maxHeight: "30%" }} alt="logo" />

                        </div>

                        <div className="my-2">
                            <Link className="btn btn-dark btn-rounded my-2" role="button" aria-pressed="true" to="/login" style={{ display: "block", fontSize: "1.5rem", padding: "5px 60px", borderRadius: "50rem" }}>Login</Link>
                            <span className="fs-4" >New to iNotes? <Link to="/signin" type="button" className="btn btn-outline-dark fs-5" style={{ borderColor: "transparent" }}>Join Now!</Link></span>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Welcome;
