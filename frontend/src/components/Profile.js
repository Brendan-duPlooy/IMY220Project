import React from 'react';
import PlaylistPreview from './PlaylistPreview';

class Profile extends React.Component {
  render() {
    const { name, username, bio, img, playlists } = this.props;
    return (
      <div>
        <img src={img} alt={`${name}'s profile`} />
        <h2>{name}</h2>
        <h3>{username}</h3>
        <p>{bio}</p>
        <h2>Playlists</h2>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <PlaylistPreview key={playlist._id} {...playlist} />
          ))
        ) : (
          <p>No playlists available.</p>
        )}
      </div>
    );
  }
}

export default Profile;


  