import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const PlaylistPage =() =>{
  const {id} = useParams();
  return(
    <div className="bg-secondary text-white min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-3xl font-bold">Playlist {id}</h1>
      </div>
    </div>
  );
};

export default PlaylistPage;
