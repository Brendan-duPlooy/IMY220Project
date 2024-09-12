import React from 'react';
import PlaylistPreview from './PlaylistPreview';

class Profile extends React.Component {
  render() {
    const {name,username,bio,img,playlists} = this.props;
    return(
        <div>
            <img src={img} alt="Picture of "/>
            <h2>{name}</h2>
            <h3>{username}</h3>
            <p>{bio}</p>
            {/* Functionality will be added later to these bellow for when they should be visible or not */}
            {/* <button>Edit Profile</button> */}
            {/* <button>Add Friend</button> | <button>Unfollow Friend</button> */}
            {/* <h3><button>Friends</button></h3> */}
            {/* If "Friends" got clicked: {friends.map(event => <li >{event.name}</li>)} */}
            <h2>Playlists</h2>
            {playlists.map(i => <PlaylistPreview key={i.id} {...i} />)}
        </div>
    );
  }
}

export default Profile;

  