import React from 'react';
import PlaylistPreview from './PlaylistPreview';

class PlayListFeed extends React.Component 
{
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  
  constructor(props) 
  {
    super(props);
    this.state = {
      playlists: [],
      loading: true,
      error: null

    };
  }

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  componentDidMount() 
  {
    fetch('/api/playlists')
      .then(response => response.json())
      .then(data => {
        this.setState({ playlists: data.reverse(), loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  render() 
  {
    const { playlists, loading, error } = this.state;
    const { id } = this.props;

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    if(loading) 
    {
      return <p>Loading...</p>;
    }

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    if(error) 
    {
      return <p>Error: {error.message}</p>;
    }

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    return (
      <div>
        <h2>Playlists</h2>
        {playlists.length > 0 ? (
          playlists.map(playlist => (
            <PlaylistPreview key={playlist._id} 
              name={playlist.name}
              description={playlist.description}
              imageUrl={playlist.imageUrl}
              playlistId={playlist._id}
              id={id} 
            />
          ))
        ) : (
          <p>No playlists available</p>
        )}
      </div>
    );

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  }
}

export default PlayListFeed;
