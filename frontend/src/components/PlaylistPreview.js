import React from 'react';

class PlaylistPreview extends React.Component 
{
  render() 
  {
    const {playlistName,description,img} = this.props;
    return(
        <div>
            {/* image will be the background */}
            <img src={img} alt={playlistName}/>
            {/* name will be on the bottom left */}
            <h3>{playlistName}</h3>
            {/* with the description underneath it */}
            <p>{description}</p>
        </div>
    );
  }
}

export default PlaylistPreview;
