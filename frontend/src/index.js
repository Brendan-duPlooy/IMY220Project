import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PlaylistPage from "./pages/PlaylistPage";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<SplashPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile/:id" element={<ProfilePage/>}/>
        <Route path="/playlist/:id" element={<PlaylistPage/>}/>
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App/>, document.getElementById("root"));

