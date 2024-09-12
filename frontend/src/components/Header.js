import React from 'react';
import {Link} from "react-router-dom";

class Header extends React.Component 
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
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/profile/5436754873">Profile</Link>
                </li>
                <li>
                    <Link to="/playlist/5436754873">Playlist</Link>
                </li>
          </ul>
        </nav>
    );
  }
}

export default Header;

  