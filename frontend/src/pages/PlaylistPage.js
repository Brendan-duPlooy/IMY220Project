import React from "react";
import { useParams } from "react-router-dom";

const PlaylistPage =() =>{
  const {id} = useParams();
  return(
    <div>
      <h1>Playlist {id}</h1>
    </div>
  );
};

export default PlaylistPage;
