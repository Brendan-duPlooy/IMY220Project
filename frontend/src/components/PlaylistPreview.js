import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PlaylistPreview = ({ name, description, imageUrl, playlistId, id }) => {

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const navigate = useNavigate();

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const handleClick = () => {
    // <Link to={`/playlist/${id}/${playlistId}`}></Link>
  };

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  return (
    <div onClick={handleClick} className="cursor-pointer border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <Link  className="text-xl font-bold" to={`/playlist/${id}/${playlistId}`}>{name}</Link>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
};

export default PlaylistPreview;
