import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import SongFeed from "../components/SongFeed";
import PlayListFeed from "../components/PlayListFeed";

const HomePage = () => {
  const { id } = useParams();

  return (
    <div className="bg-secondary text-white min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Home</h1>
        <SearchInput />
        <SongFeed />
        <PlayListFeed />
      </div>
    </div>
  );
};

export default HomePage;

