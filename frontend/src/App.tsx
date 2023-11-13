import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PostPage from './components/posts/PostPage';
import NavBar from './components/NavBar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { AuthProvider } from "./Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PostPage />} />            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
