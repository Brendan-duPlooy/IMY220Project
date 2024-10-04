import React from 'react';
import { Link, useParams } from "react-router-dom";

const Header = () => {
  const { id } = useParams(); // Get the ID from the current route parameters

  return (
    <nav>
      <img src="../public/assets/images" alt="Picture of Puhiwi logo" />
      <ul>
        {/* Using string interpolation to add the dynamic id to the URL */}
        <li>
          <Link to={`/home/${id}`}>Home</Link>
        </li>
        <li>
          <Link to={`/profile/${id}`}>Profile</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;


  