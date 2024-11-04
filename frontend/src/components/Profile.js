import React from 'react';
import PlaylistPreview from './PlaylistPreview';

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

class Profile extends React.Component 
{
  render() 
  {
    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    const { name, username, bio, img, playlists, id } = this.props;

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    return (
      <div>
        <img src={img} alt={`${name}'s profile`} />
        <h2>{name}</h2>
        <h3>{username}</h3>
        <p>{bio}</p>
        <h2>Playlists</h2>

        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <PlaylistPreview key={playlist._id} 
            name={playlist.name}
            description={playlist.description}
            imageUrl={playlist.imageUrl}
            playlistId={playlist._id}
             id={id} />
          ))
        ) : (
          <p>No playlists available.</p>
        )}
      </div>
    );

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  }
}

export default Profile;


  