import React from 'react';

class AddSong extends React.Component 
{
  render() 
  {
    return(
        <form>
            <h3>Add a Song: </h3>
            {/* use IMY 110 website as ref for forms */}
            <label>Song Name <input required type="text" placeholder="Highway to Heaven"/></label>
            <label>Artist <input required type="text" placeholder="Jeffrey Babel"/></label>
            <label>URL <input required type="url" placeholder="https://open.spotify.com/track/2398y439dfjkn24fsdg234w"/></label>
            <button type="submit">Submit</button>
        </form>
      );
  }
}

export default AddSong;
