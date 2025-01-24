import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/layout/Header'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Login from "./components/modals/Login"
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import About from './components/pages/About'
import ThemeProvider from './providers/ThemeProvider'
import MyProfile from './components/users/MyProfile'
import MyCards from './components/cards/MyCards'
import FavoriteCards from './components/cards/FavoriteCards'
import CardPage from './components/cards/CardPage'
import SnackbarProvider from './providers/SnackbarProvider'
import Sandbox from './components/pages/Sandbox'
import { jwtDecode } from 'jwt-decode'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const ProtectedAdminRoute = ({ children }) => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider>
      <SnackbarProvider>
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
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/my-cards" element={<MyCards />} />
                <Route path="/favorites" element={<FavoriteCards />} />
                <Route path="/card/:id" element={<CardPage />} />
                <Route 
                  path="/admin-sandbox" 
                  element={
                    <ProtectedAdminRoute>
                      <Sandbox />
                    </ProtectedAdminRoute>
                  }
                />
              </Routes>
            </div>
          </main>
          <Footer />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App