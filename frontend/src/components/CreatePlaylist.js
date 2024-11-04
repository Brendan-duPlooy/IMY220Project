import React, { useState } from "react";

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

const CreatePlaylist = ({ id, userName, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hashtags: "",
    genre: "",
    imageUrl: "",
  });

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const handleSubmit = async (e) => {
    e.preventDefault();

    const playlistName = formData.name.trim() ? formData.name : `${userName}'s Playlist-1`;

    const playlistResponse = await fetch("/api/playlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        name: playlistName,
        creator: id
      }),
    });

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    const newPlaylist = await playlistResponse.json();

    if (playlistResponse.status === 201) {
      await fetch(`/api/users/${id}/playlists`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistId: newPlaylist._id }),
      });
      

      alert("Playlist created and added to your profile!");
      onCreate();

    } 
    else 
    {
      console.error("Error creating playlist.");
    }
  };

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Highway to Heaven" />
      </label>
      <label>
        Description <textarea name="description" value={formData.description} onChange={handleChange} placeholder="A mix of rock and lofi music" />
      </label>
      <label>
        Hashtags <input type="text" name="hashtags" value={formData.hashtags} onChange={handleChange} placeholder="#rockLofi#socool" />
      </label>
      <label>
        Genre 
        <select name="genre" value={formData.genre} onChange={handleChange}>
          <option value="piratemetal">Pirate Metal</option>
          <option value="folktronica">Folktronica</option>
          <option value="mathrock">Math Rock</option>
          <option value="kawaiimetal">Kawaii metal</option>
          <option value="vaporwave">Vaporwave</option>
        </select>
      </label>
      <label>
        Image URL <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Cover Image URL" />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePlaylist;
