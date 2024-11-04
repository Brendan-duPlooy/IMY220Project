import React from 'react';
import {Link} from "react-router-dom";

class Header2 extends React.Component 
{
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  render() 
  {
    return(
        <nav>
            <img src="../public/assets/images" alt="Pictue of Puhiwi logo"/>
            <ul>
                <li><Link to="/">Splash</Link></li>
                <li>
                    <Link to="/home2/0">Image</Link>
                </li>
          </ul>
        </nav>
    );
  }
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
}

export default Header2;

  