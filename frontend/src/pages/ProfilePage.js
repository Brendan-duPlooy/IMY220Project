import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import CreatePlaylist from "../components/CreatePlaylist"; 

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false); 
  const [songs, setSongs] = useState([]); // State to hold user songs
  const navigate = useNavigate(); 

  // Fetch user data and songs
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await fetch(`/api/songs`);
        const songData = await response.json();
        setSongs(songData.filter(song => song.creator === id)); // Assuming creator field exists in song
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchProfileData();
    fetchSongs();
  }, [id]);

  // Handle profile editing
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedData) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      setUserData(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle profile deletion
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        alert("Profile deleted successfully.");
        navigate("/"); // Redirect to home after deletion
      } else {
        console.error("Error deleting profile.");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  // Handle playlist creation submission
  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newPlaylistData = {
      name: formData.get("name"),
      description: formData.get("description"),
      hashtags: formData.get("hashtags").split("#").filter(Boolean), // Split by # and remove empty strings
      genre: formData.get("genre"),
      imageUrl: formData.get("imageUrl"),
      creator: id // Pass the user id as the creator
    };

    try {
      // Create new playlist
      const playlistResponse = await fetch(`/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlaylistData),
      });

      const createdPlaylist = await playlistResponse.json();

      // Update user's playlist array with the new playlist
      const updatedUserData = {
        ...userData,
        playlists: [...userData.playlists, createdPlaylist._id]
      };

      // Save updated user data
      await handleSave(updatedUserData);

      // Close the create playlist form
      setIsCreatingPlaylist(false);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  // Handle song creation
  const handleCreateSong = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSong = {
      name: formData.get("name"),
      artist: formData.get("artist"),
      spotifyUrl: formData.get("spotifyUrl"),
      creator: id // Assign the current user as the song creator
    };

    try {
      const response = await fetch(`/api/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });
      const createdSong = await response.json();
      setSongs([...songs, createdSong]); // Add the new song to the list
    } catch (error) {
      console.error("Error creating song:", error);
    }
  };

  // Handle song deletion
  const handleDeleteSong = async (songId) => {
    try {
      const response = await fetch(`/api/songs/${songId}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        setSongs(songs.filter(song => song._id !== songId)); // Remove the deleted song
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <div className="bg-secondary text-white min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-3xl font-bold">Profile</h1>
        {userData && (
          <>
            {isEditing ? (
              <EditProfile
                name={userData.name}
                bio={userData.bio}
                onSave={handleSave}
              />
            ) : (
              <Profile
                name={userData.name}
                username={userData.email}
                bio={userData.bio}
                img={userData.profileImageUrl}
                playlists={userData.playlists || []}
              />
            )}

            {!isEditing && (
              <div className="mt-4">
                <button 
                  onClick={handleEditClick} 
                  className="bg-primary text-white px-4 py-2 rounded mr-2"
                >
                  Edit Profile
                </button>
                <button 
                  onClick={() => setIsCreatingPlaylist(true)} 
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Create Playlist
                </button>
              </div>
            )}

            <button 
              onClick={handleDelete} 
              className="text-red-600 mt-4"
            >
              Delete Profile
            </button>

            {isCreatingPlaylist && (
              <CreatePlaylist calledFunc={handleCreatePlaylist} />
            )}

            <h2 className="text-2xl mt-4">Create a New Song</h2>
            <form onSubmit={handleCreateSong} className="mt-2">
              <input type="text" name="name" placeholder="Song Name" required className="mr-2 p-1"/>
              <input type="text" name="artist" placeholder="Artist" required className="mr-2 p-1"/>
              <input type="url" name="spotifyUrl" placeholder="Spotify URL" required className="mr-2 p-1"/>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Create Song</button>
            </form>

            <h2 className="text-2xl mt-4">Your Songs</h2>
            <ul className="mt-2">
              {songs.map(song => (
                <li key={song._id} className="flex justify-between items-center bg-accent text-black rounded p-2 mt-2">
                  <span>{song.name} by {song.artist}</span>
                  <button onClick={() => handleDeleteSong(song._id)} className="text-red-600">Delete Song</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
