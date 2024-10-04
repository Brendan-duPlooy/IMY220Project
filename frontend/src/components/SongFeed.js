import React, { Component } from 'react';
import Song from './Song';

class SongFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      isLoading: true,
      error: null
    };
  }

  componentDidMount() {
    // Fetch songs from the backend API when the component mounts
    fetch('/api/songs') // Replace with the correct API route
      .then(response => response.json())
      .then(data => this.setState({ songs: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { songs, isLoading, error } = this.state;

    if (isLoading) return <p>Loading songs...</p>;
    if (error) return <p>Error fetching songs: {error.message}</p>;

    return (
      <div>
        <h2>Songs Feed</h2>
        <div>
          {songs.length > 0 ? (
            songs.map(song => (
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
  }
}

export default SongFeed;

