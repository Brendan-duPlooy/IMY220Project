import React from 'react';
import PlaylistPreview from './PlaylistPreview';

class PlayListFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],  // Initialize with an empty array
      loading: true,  // Track loading state
      error: null     // Track error state
    };
  }

  // Fetch playlists from the API when the component mounts
  componentDidMount() {
    fetch('/api/playlists')  // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        this.setState({ playlists: data, loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    const { playlists, loading, error } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    return (
      <div>
        <h2>Playlists</h2>
        {playlists.length > 0 ? (
          playlists.map(playlist => (
            <PlaylistPreview key={playlist._id} {...playlist} />
          ))
        ) : (
          <p>No playlists available</p>
        )}
      </div>
    );
  }
}

export default PlayListFeed;
