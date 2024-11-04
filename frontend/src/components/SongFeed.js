import React, { Component } from 'react';
import Song from './Song';

class SongFeed extends Component 
{
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  constructor(props) 
  {
    super(props);
    this.state = {
      songs: [],
      isLoading: true,
      error: null
    };
  }

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  componentDidMount() 
  {
    fetch('/api/songs')
      .then(response => response.json())
      .then(data => this.setState({ songs: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  render() 
  {
    const { songs, isLoading, error } = this.state;

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    if (isLoading) return <p>Loading songs...</p>;
    if (error) return <p>Error fetching songs: {error.message}</p>;

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    const sortedSongs = songs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    return (
      <div>
        <h2>Songs Feed</h2>
        <div>
          {sortedSongs.length > 0 ? (
            sortedSongs.map(song => (
              <Song
                key={song._id}
                name={song.name}
                artist={song.artist}
                url={song.spotifyUrl}
                date={song.timestamp}
              />
            ))
          ) : (
            <p>No songs available.</p>
          )}
        </div>
      </div>
    );

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  }
}

export default SongFeed;
