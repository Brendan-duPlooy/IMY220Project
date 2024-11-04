import React from 'react';

class Song extends React.Component 
{
  render() 
  {
    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    const { name, artist, url, date } = this.props;

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

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

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  }
}

export default Song;

