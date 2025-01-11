import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Login from "./components/pages/Login";
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import About from './components/pages/About'



// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import { AuthProvider } from './components/context/AuthContext'


function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
   
    <div className={darkMode ? 'dark-mode' : ''}>
        <Router>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Navbar />
          <main style={{ minHeight: '80vh' }}>
            <div className="container py-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
              
              </Routes>
            </div>
          </main>
          <Footer />
        </Router>

    </div>
  );
}

export default App