import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Welcome, Home, About, Login, Signin, Alert } from './components'
import NoteState from './contexts/notes/noteState'
import './App.css'



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert(
      {
        msg: message,
        type: type
      }
    )
    setTimeout(() => {
      setAlert(null);
    }, 1500);

  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/home" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signin" element={<Signin showAlert={showAlert} />} />

          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
