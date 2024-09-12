import React from 'react';
import Song from './Song';

class SongFeed extends React.Component 
{
  render() 
  {
    const {songs} = this.props;
    return(
      <div>
          <h2>Songs</h2>
          {songs.map(i => ( <Song key={i.id} {...i}/> ))}
      </div>
    );
  }
}

export default SongFeed;
