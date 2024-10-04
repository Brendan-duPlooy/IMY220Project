import React, { useState } from 'react';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const startSearching = async (term) => {
    setSearchTerm(term);

    if (term) {
      try {
        // Fetch data from users, songs, and playlists APIs
        const userResponse = await fetch('/api/users');
        const users = await userResponse.json();

        const songResponse = await fetch('/api/songs');
        const songs = await songResponse.json();

        const playlistResponse = await fetch('/api/playlists');
        const playlists = await playlistResponse.json();

        // Combine results based on search term
        const filteredUsers = users.filter(user =>
          user.name.toLowerCase().includes(term.toLowerCase())
        );
        const filteredSongs = songs.filter(song =>
          song.name.toLowerCase().includes(term.toLowerCase())
        );
        const filteredPlaylists = playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(term.toLowerCase())
        );

        // Set combined results
        setResults([
          ...filteredUsers.map(user => ({ type: 'User', name: user.name })),
          ...filteredSongs.map(song => ({ type: 'Song', name: song.name })),
          ...filteredPlaylists.map(playlist => ({ type: 'Playlist', name: playlist.name })),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setResults([]); // Clear results if search term is empty
    }
  };

  return (
    <div>
      <input 
        placeholder="Search for playlists, songs, or users..." 
        type="text" 
        onChange={(e) => startSearching(e.target.value)}
        aria-label="Search"
        className="border border-gray-300 rounded p-2"
      />
      {results.length > 0 && (
        <div className="mt-2">
          <h3>Search Results:</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="py-1">
                {result.type}: {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;

