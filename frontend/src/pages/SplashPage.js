import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import Header2 from "../components/Header2";

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

const SplashPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  return (
    <div className="bg-secondary text-white min-h-screen flex flex-col items-center justify-center">
      <Header2/>
      <h1 className="text-4xl font-bold">Puhiwi</h1>
      <p className="mt-4">Cook up the hottest playlists.</p>

      {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

      <div className="mt-8">
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Sign Up</button>
      </div>

      {showLogin ? <LoginForm /> : <SignUpForm />}
    </div>
  );

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
};

export default SplashPage;


