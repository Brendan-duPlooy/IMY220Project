import React from 'react';

class Song extends React.Component {
  render() {
    const { name, artist, url, date } = this.props;

    return (
      <div className="song-card border p-4 my-2 rounded shadow">
        <h3>{name}</h3>
        <p>Artist: {artist}</p>
        <p>Added on: {new Date(date).toLocaleDateString()}</p>
        <iframe
          src={`https://open.spotify.com/embed/track/` + url.split('/').pop()}
          width="300"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      </div>
    );
  }
}

export default Song;

