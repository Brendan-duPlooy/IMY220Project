import React, { useState } from "react";

const CreatePlaylist = ({ userId, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hashtags: "",
    genre: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, create the playlist
      const playlistResponse = await fetch("/api/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          creator: userId, // Link playlist to the user
        }),
      });

      const newPlaylist = await playlistResponse.json();

      if (playlistResponse.status === 201) {
        // Now, update the user to add the new playlist ID
        const userResponse = await fetch(`/api/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playlistId: newPlaylist._id }),
        });

        if (userResponse.status === 200) {
          alert("Playlist created and added to your profile!");
          onCreate(); // Trigger parent update, such as refreshing the page or list
        } else {
          console.error("Error updating user with new playlist.");
        }
      } else {
        console.error("Error creating playlist.");
      }
    } catch (error) {
      console.error("Error during playlist creation process:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Highway to Heaven" />
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

