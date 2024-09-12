import React from 'react';
import PlaylistPreview from './PlaylistPreview';

class SongFeed extends React.Component 
{
  render() 
  {
    const {playlists} = this.props;
    return(
      <div>
        <h2>PlayLists</h2>
        {playlists.map(i => ( <PlaylistPreview key={i.id} {...i}/> ))}
      </div>
    );
  }
}

export default SongFeed;