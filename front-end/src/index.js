import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Footer from './components/navigation/Footer';
import Header from './components/navigation/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpForm from './components/navigation/SignUpForm';
import SignIn from './components/navigation/SignIn';
import Profile from './components/navigation/Profile';
import './AppRouter.css';

const AppRouter = () => (
  <Router>
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
