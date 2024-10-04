import React from 'react';
import {Link} from "react-router-dom";

class Header2 extends React.Component 
{
  render() 
  {
    return(
        <nav>
            <img src="../public/assets/images" alt="Pictue of Puhiwi logo"/>
            <ul>
                {/* wont be be used like this in the future, just showcasing that it works temporarily */}
                <li><Link to="/">Splash</Link></li>
                <li>
                    {/* will do proper routing later */}
                    {/* (implemented) */}
                    <Link to="/home2/0">Image</Link>
                </li>
          </ul>
        </nav>
    );
  }
}

export default Header2;

  