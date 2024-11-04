import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import SongFeed from "../components/SongFeed";
import PlayListFeed from "../components/PlayListFeed";

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

const HomePage = () => {
  const { id } = useParams();
  const [showSongs, setShowSongs] = useState(true);

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  return (
    <div className="bg-secondary text-white min-h-screen">
      <Header />

      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Home</h1>
        <SearchInput id={id} />

        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

        <div className="mb-4">
          <button 
            onClick={() => setShowSongs(true)} 
            className={`mr-2 px-4 py-2 rounded ${showSongs ? 'bg-primary' : 'bg-gray-600'}`}
          >
            Songs
          </button>

          {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

          <button 
            onClick={() => setShowSongs(false)} 
            className={`px-4 py-2 rounded ${!showSongs ? 'bg-primary' : 'bg-gray-600'}`}
          >
            Playlists
          </button>
        </div>

        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

        {showSongs ? <SongFeed /> : <PlayListFeed id={id} />}
      </div>
    </div>
  );

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
};

export default HomePage;
