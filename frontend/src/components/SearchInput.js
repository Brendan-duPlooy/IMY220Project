import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';

const SearchInput = ({ id }) => {
  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const fuseOptions = {
    keys: [
      { name: 'name', weight: 0.7 },
      { name: 'hashtags', weight: 0.3 }
    ],
    threshold: 0.3,
    includeScore: true
  };

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const startSearching = async (term) => {
    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    setSearchTerm(term);

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    if(term) 
      {
      try 
      {
        const userResponse = await fetch('/api/users');
        const users = await userResponse.json();

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        const songResponse = await fetch('/api/songs');
        const songs = await songResponse.json();

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        const playlistResponse = await fetch('/api/playlists');
        const playlists = await playlistResponse.json();

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        const userFuse = new Fuse(users, { keys: ['name'], threshold: 0.3 });
        const songFuse = new Fuse(songs, { keys: ['name'], threshold: 0.3 });
        const playlistFuse = new Fuse(playlists, fuseOptions);

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        const filteredUsers = userFuse.search(term).map(result => ({ ...result.item, type: 'User' }));
        const filteredSongs = songFuse.search(term).map(result => ({ ...result.item, type: 'Song' }));
        const filteredPlaylists = playlistFuse.search(term).map(result => ({ ...result.item, type: 'Playlist' }));

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        setResults([
          ...filteredUsers.map(user => ({ type: 'User', name: user.name, id: user._id })),
          ...filteredSongs.map(song => ({ type: 'Song', name: song.name, id: song._id })),
          ...filteredPlaylists.map(playlist => ({ type: 'Playlist', name: playlist.name, id: playlist._id }))
        ]);

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        setAutocompleteSuggestions([
          ...filteredUsers.slice(0, 5).map(user => user.name),
          ...filteredSongs.slice(0, 5).map(song => song.name),
          ...filteredPlaylists.slice(0, 5).map(playlist => playlist.name)
        ]);

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      } 
      catch(error) 
      {
        console.error('Error fetching data:', error);
      }
    } 
    else 
    {
      setResults([]);
      setAutocompleteSuggestions([]);
    }
  };

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  return (
    <div>
      <input
        placeholder="Search for playlists, songs, or users..."
        type="text"
        value={searchTerm}
        onChange={(e) => startSearching(e.target.value)}
        aria-label="Search"
        className="border border-gray-300 rounded p-2"
        list="autocomplete"
      />

      {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

      <datalist id="autocomplete">
        {autocompleteSuggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>

      {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

      {results.length > 0 && (
        <div className="mt-2">
          <h3>Search Results:</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="py-1">
                {result.type === 'User' ? (
                  <Link to={`/profile/${id}/${result.id}`} className="text-blue-600 underline">
                    {result.type}: {result.name}
                  </Link>

                ) : result.type === 'Playlist' ? (
                  <Link to={`/playlist/${id}/${result.id}`} className="text-blue-600 underline">
                    {result.type}: {result.name}
                  </Link>
                  
                ) : (
                  <span>{result.type}: {result.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
};

export default SearchInput;
