
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/modals/Login';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import About from './components/pages/About';
import MyProfile from './components/users/MyProfile';
import MyCards from './components/cards/MyCards';
import FavoriteCards from './components/cards/FavoriteCards';
import CreateCard from './components/cards/CreateCard';
import ThemeProvider from './providers/ThemeProvider';
import Sandbox from './components/pages/Sandbox';
import EditCard from './components/modals/EditCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SnackbarProvider from './providers/SnackBarProvider';
import CardPage from './components/cards/CardPage';
import NotFound from './components/pages/NotFound';

function App() {
  const [userType, setUserType] = useState('guest');

  useEffect(() => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.isAdmin) {
        setUserType('admin');
      } else if (decoded.isBusiness) {
        setUserType('business');
      } else {
        setUserType('user');
      }
    } else {
      setUserType('guest');
    }
  }, []);

  return (
    <ThemeProvider>
      <SnackbarProvider>
        <Router>
          <Header userType={userType} />
          <Navbar userType={userType} />
          <main style={{ minHeight: '80vh' }}>
            <div className="container py-4">
              <Routes>
                {/* Public Routes - Available to Everyone */}
                <Route path="/" element={<Home userType={userType} />} />
                <Route path="/card/:id" element={<CardPage />} />
                <Route path="/about" element={<About />} />
                {/* Guest Only Routes */}
                {userType === 'guest' && (
                  <>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                  </>
                )}

                {/* Authenticated User Routes */}
                {userType !== 'guest' && (
                  <>
                    <Route path="/profile" element={<MyProfile />} />
                    <Route path="/favorites" element={<FavoriteCards />} />
                  </>
                )}

                {/* Business & Admin Routes */}
                {(userType === 'business' || userType === 'admin') && (
                  <>
                    <Route path="/my-cards" element={<MyCards />} />
                    <Route path="/create-card" element={<CreateCard />} />
                    <Route path="/edit-card/:id" element={<EditCard />} />
                  </>
                )}

                {/* Admin Only Routes */}
                {userType === 'admin' && (
                  <>
                    <Route path="/sandbox" element={<Sandbox />} />
                  </>
                )}

                {/* Not Found Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
          <Footer userType={userType} />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;