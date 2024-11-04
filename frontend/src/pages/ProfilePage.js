import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Profile2 from "../components/Profile2";
import EditProfile from "../components/EditProfile";
import CreatePlaylist from "../components/CreatePlaylist";

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

const ProfilePage = () => {
  const { id, profileID } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const navigate = useNavigate();

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  useEffect(() => {
    if(id === profileID || id === '6727c320c7c7d4d6f1b0cd63') 
    {
      setIsEditable(true);
    } 
    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
    else 
    {
      const checkFriendshipStatus = async () => {
        try 
        {
          const response = await fetch(`/api/users/${profileID}`);
          const data = await response.json();

          if(data.friends.includes(id) && id != '6727c320c7c7d4d6f1b0cd63') 
          {
            setIsFriend(true);
          } 
          //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
          else if (data.requesting.includes(id) && id != '6727c320c7c7d4d6f1b0cd63') 
          {
            setIsRequestSent(true);
          }
        } 
        catch(error) 
        {
          console.error("Error checking friendship status:", error);
        }
      };
      checkFriendshipStatus();
    }

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    const fetchProfileData = async () => {
      try 
      {
        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        const response = await fetch(`/api/users/${profileID}`);
        const data = await response.json();
        setUserData(data);
        setFriendRequests(data.requesting || []);
        setFriends(data.friends || []);

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        if(data.playlists && data.playlists.length > 0) 
        {
          const playlistData = await Promise.all(
            data.playlists.map((playlistId) =>
              fetch(`/api/playlists/${playlistId}`).then((res) => res.json())
            )
          );
          setUserPlaylists(playlistData);

          //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

          const allSongs = await Promise.all(
            playlistData.map(async (playlist) => {
              const songs = await Promise.all(
                playlist.songs.map((songId) =>
                  fetch(`/api/songs/${songId}`).then((res) => res.json())
                )
              );
              return songs;
            })
          );

          //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

          const uniqueSongs = Array.from(
            new Map(allSongs.flat().map((song) => [song._id, song])).values()
          );
          setSongs(uniqueSongs);

          //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
        }
      } 
      catch (error) 
      {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [id, profileID]);

  //---------------------------------------------------------------------------------------------------------

  const handleEditClick = () => {
    setIsEditing(true);
  };

  //---------------------------------------------------------------------------------------------------------

  const onCreate = () => {
    fetchProfileData();
    setIsCreatingPlaylist(false);
  };

  //---------------------------------------------------------------------------------------------------------

  const handleSave = async (updatedData) => {
    try 
    {
      const response = await fetch(`/api/users/${profileID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      const data = await response.json();
      setUserData(data);
      setIsEditing(false);
    } 
    catch (error) 
    {
      console.error("Error updating profile:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------

  const handleDelete = async () => {
    try 
    {
      const response = await fetch(`/api/users/${profileID}`, {
        method: "DELETE",
      });
      if(response.status === 204) 
      {
        alert("Profile deleted successfully.");
        navigate("/");
      } 
      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
      else 
      {
        console.error("Error deleting profile.");
      }
    } 
    catch(error) 
    {

      console.error("Error deleting profile:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!isEditable) return;

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    const formData = new FormData(e.target);
    const newPlaylistData = {
      name: formData.get("name"),
      description: formData.get("description"),
      hashtags: formData.get("hashtags").split("#").filter(Boolean),
      genre: formData.get("genre"),
      imageUrl: formData.get("imageUrl"),
      creator: profileID,
    };

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    try 
    {
      const playlistResponse = await fetch(`/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlaylistData),
      });
      const createdPlaylist = await playlistResponse.json();

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      await fetch(`/api/users/${profileID}/playlists`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistId: createdPlaylist._id }),
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      const userResponse = await fetch(`/api/users/${profileID}`);
      const updatedUserData = await userResponse.json();
      setUserData(updatedUserData);
      setUserPlaylists([...userPlaylists, createdPlaylist]);

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      setIsCreatingPlaylist(false);
      window.location.reload();
    } 
    catch (error) 
    {
      console.error("Error creating playlist:", error);
    }

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  };

  //---------------------------------------------------------------------------------------------------------

  const handleCreateSong = async (e) => {
    e.preventDefault();
    if(!isEditable) return;

    const formData = new FormData(e.target);
    const newSong = {
      name: formData.get("name"),
      artist: formData.get("artist"),
      spotifyUrl: formData.get("spotifyUrl"),
      creator: profileID,
    };

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    try 
    {
      const response = await fetch(`/api/songs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      const createdSong = await response.json();
      setSongs([...songs, createdSong]);
    } 
    catch(error) 
    {
      console.error("Error creating song:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------

  const handleDeleteSong = async (songId) => {
    if (!isEditable) return;

    try 
    {
      const response = await fetch(`/api/songs/${songId}`, {
        method: "DELETE",
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      if(response.status === 204) 
        {
        setSongs(songs.filter((song) => song._id !== songId));
      }
    }
    catch(error) 
    {
      console.error("Error deleting song:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------

  const handleAcceptRequest = async (requesterId) => {
    try 
    {
      const response = await fetch(`/api/users/${profileID}/acceptFriend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requesterId }),
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      if(response.ok) 
      {
        setFriends((prevFriends) => [...prevFriends, requesterId]);
        setFriendRequests((prevRequests) =>
          prevRequests.filter((reqId) => reqId !== requesterId)
        );
      }
    } 
    catch(error) 
    {
      console.error("Error accepting friend request:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------

  const handleFriendRequest = async () => {
    try 
    {
      const response = await fetch(`/api/users/${profileID}/requestFriend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requesterId: id }),
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      if(response.ok) 
      {
        setIsRequestSent(true);
      }
    } 
    catch(error) 
    {
      console.error("Error sending friend request:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------

  return (
    <div className="bg-secondary text-white min-h-screen">
      <Header />
      <div className="p-4">
        <h1 className="text-3xl font-bold">Profile</h1>
        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}
        {userData && (
          <>
            {isEditable || isFriend ? (
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
                  playlists={userPlaylists}
                  id={profileID}
                />
              )}

              {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

              {isEditable && !isEditing && (
                <div className="mt-4">
                  <button
                    onClick={handleEditClick}
                    className="bg-primary text-white px-4 py-2 rounded mr-2"
                  >
                    Edit Profile
                  </button>

                  {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

                  <button
                    onClick={() => setIsCreatingPlaylist(true)}
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    Create Playlist
                  </button>

                  {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}
                </div>
              )}

              {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

              {isEditable && (
                <button onClick={handleDelete} className="text-red-600 mt-4">
                  Delete Profile
                </button>
              )}

              {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

              {isCreatingPlaylist && (
                <CreatePlaylist id={profileID} onCreate={onCreate} calledFunc={handleCreatePlaylist} />
              )}

              {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

              {isEditable && (
                <>
                  <h2 className="text-2xl mt-4">Create a New Song</h2>
                  <form onSubmit={handleCreateSong} className="mt-2">
                    <input type="text" name="name" placeholder="Song Name" required className="mr-2 p-1" />
                    <input type="text" name="artist" placeholder="Artist" required className="mr-2 p-1" />
                    <input type="url" name="spotifyUrl" placeholder="Spotify URL" required className="mr-2 p-1" />
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Create Song</button>
                  </form>
                </>
              )}

              {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

              <h2 className="text-2xl mt-4">Your Songs</h2>
              <ul className="mt-2">
                {songs.map((song) => (
                  <li key={song._id} className="flex justify-between items-center bg-accent text-black rounded p-2 mt-2">
                    <span>{song.name} by {song.artist}</span>
                    {isEditable && (
                      <button onClick={() => handleDeleteSong(song._id)} className="text-red-600">Delete Song</button>
                    )}
                  </li>
                ))}
              </ul>

              {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

              {isEditable && (
                  <>
                    <h2 className="text-2xl mt-4">Friend Requests</h2>
                    <ul>
                      {friendRequests.map((requesterId) => (
                        <li key={requesterId} className="flex justify-between items-center bg-accent text-black rounded p-2 mt-2">
                          <span>{requesterId}</span> {/* Display user details here */}
                          <button
                            onClick={() => handleAcceptRequest(requesterId)}
                            className="bg-primary text-white px-4 py-2 rounded"
                          >
                            Accept
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

                <h2 className="text-2xl mt-4">Friends</h2>
                <ul>
                  {friends.map((friendId) => (
                    <li key={friendId} className="bg-accent text-black rounded p-2 mt-2">
                      <span>{friendId}</span> {/* Display user details here */}
                    </li>
                  ))}
                </ul>

                {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}
            </>
            ) : (
              <Profile2
                name={userData.name}
                img={userData.profileImageUrl}
              />,
              
              !isFriend && !isRequestSent && (
                <button onClick={handleFriendRequest} className="bg-primary text-white px-4 py-2 rounded">
                  Send Friend Request
                </button>
              )
              )}

            {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}
          </>
        )}
      </div>
    </div>
  );

  {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}
};

export default ProfilePage;
