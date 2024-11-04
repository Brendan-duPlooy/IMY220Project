import React from 'react';
import { Link, useParams } from "react-router-dom";

const Header = () => {

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const { id } = useParams();

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  return (
    <nav>
      <Link to={`/home/${id}`}><img src="./images/puhiwi.png" alt="Picture of Puhiwi logo"/></Link>
      <ul>
        <li>
          <Link to={`/home/${id}`}>Home</Link>
        </li>
        <li>
          <Link to={`/profile/${id}/${id}`}>Profile</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
};

export default Header;


  