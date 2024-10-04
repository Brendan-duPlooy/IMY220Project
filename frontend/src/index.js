import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import HomePage from "./pages/HomePage";
import HomePage2 from "./pages/HomePage2";
import ProfilePage from "./pages/ProfilePage";
import PlaylistPage from "./pages/PlaylistPage";
import Header from "./components/Header";
import './tailwind.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path="/home/:id" element={<HomePage/>}/>
        <Route path="/home2/:id" element={<HomePage2/>}/>
        <Route path="/profile/:id" element={<ProfilePage/>}/>
        <Route path="/playlist/:id" element={<PlaylistPage/>}/>
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App/>, document.getElementById("root"));

