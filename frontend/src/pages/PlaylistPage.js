import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Song from '../components/Song';

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

const PlaylistPage = () => {
  const { id, playlistId } = useParams();
  const navigate = useNavigate(); // To navigate after deletion
  const [playlistData, setPlaylistData] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [newSong, setNewSong] = useState({ name: '', artist: '', spotifyUrl: '' });
  const [newComment, setNewComment] = useState('');
  const [newCommentImage, setNewCommentImage] = useState('');
  const [comments, setComments] = useState([]);

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  const [editableFields, setEditableFields] = useState({
    name: '',
    description: '',
    hashtags: '',
    genre: '',
    imageUrl: ''
  });

  //---------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const fetchPlaylistData = async () => {
      try 
      {
        const response = await fetch(`/api/playlists/${playlistId}`);
        const data = await response.json();
        setPlaylistData(data);

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        setEditableFields({
          name: data.name,
          description: data.description,
          hashtags: data.hashtags.join(', '),
          genre: data.genre,
          imageUrl: data.imageUrl
        });

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        if(data.creator === id || id === '6727c320c7c7d4d6f1b0cd63') 
          {
          setIsEditable(true);
        }

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        if(data.songs && data.songs.length > 0) 
        {
          const songPromises = data.songs.map(songId =>
            fetch(`/api/songs/${songId}`).then(res => res.json())
          );
          const songsDetails = await Promise.all(songPromises);
          setSongs(songsDetails);
        }

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        setComments(data.comments || []);
      } 
      catch(error) 
      {

        console.error("Error fetching playlist data:", error);
      }
    };

    fetchPlaylistData();
  }, [id, playlistId]);

  //---------------------------------------------------------------------------------------------------------

  const handleAddSong = async (e) => {
    e.preventDefault();
    const songExists = songs.some(song => song.name === newSong.name && song.artist === newSong.artist);

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    if(songExists) 
    {
      const confirmAdd = window.confirm('This song already exists in the playlist. Do you want to add it anyway?');
      if(!confirmAdd) 
      {
          return;
      }
    }

    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    try 
    {
      const songResponse = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      if(songResponse.ok) 
      {
        const createdSong = await songResponse.json();
        
        const response = await fetch(`/api/playlists/${playlistId}/songs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ songId: createdSong._id }),
        });

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        if(response.ok) 
        {
          const updatedPlaylist = await response.json();
          setPlaylistData(updatedPlaylist);
          setNewSong({ name: '', artist: '', spotifyUrl: '' });
        } 
        else 
        {
          console.error('Error adding song to playlist');
        }

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
      } 
      else 
      {
        console.error('Error creating new song');
      }
    } 
    catch (error) 
    {
      console.error("Error adding song:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------

  const handleDeleteSong = async (songId) => {
    try 
    {
      const deleteFromPlaylistResponse = await fetch(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE',
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      if(deleteFromPlaylistResponse.ok) 
      {
        const deleteSongResponse = await fetch(`/api/songs/${songId}`, {
          method: 'DELETE',
        });

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

        if(deleteSongResponse.ok) 
        {
          setSongs(songs.filter(song => song._id !== songId));
        } 
        else 
        {
          console.error('Error deleting song from songs collection');
        }

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
      } 
      else 
      {
        console.error('Error deleting song from playlist');
      }
    } 
    catch (error) 
    {
      console.error("Error deleting song:", error);
    }

    //---------------------------------------------------------------------------------------------------------
  };

  const handleEditPlaylist = async (e) => {
    e.preventDefault();

    try 
    {
      const response = await fetch(`/api/playlists/${playlistId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editableFields.name,
          description: editableFields.description,
          hashtags: editableFields.hashtags.split(',').map(tag => tag.trim()),
          genre: editableFields.genre,
          imageUrl: editableFields.imageUrl
        })
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

      if(response.ok) 
      {
        const updatedData = await response.json();
        setPlaylistData(updatedData);
      } 
      else 
      {
        console.error("Error updating playlist data");
      }

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
    } 
    catch (error) 
    {
      console.error("Error editing playlist:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  
    try 
    {
      const userResponse = await fetch(`/api/users/${id}`);
      if(!userResponse.ok) 
        {
        console.error("Error fetching user data");
        return;
      }

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

  
      const userData = await userResponse.json();
      const userName = userData.name;

  //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  
      const response = await fetch(`/api/playlists/${playlistId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userName,
          comment: newComment,
        }),
      });

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  
      if (response.ok) 
      {
        const updatedPlaylist = await response.json();
        setComments(updatedPlaylist.comments);
        setNewComment('');
        setNewCommentImage('');
      } 
      else 
      {
        console.error('Error adding comment');
      }

      //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
    } 
    catch (error) 
    {
      console.error("Error adding comment:", error);
    }
  };

  //---------------------------------------------------------------------------------------------------------

  const handleDeletePlaylist = async () => {
    //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

    if(window.confirm('Are you sure you want to delete this playlist?')) 
    {
      try 
      {
        const response = await fetch(`/api/playlists/${playlistId}`, {
          method: 'DELETE',
        });

        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  
        if(response.ok) 
        {
          const userResponse = await fetch(`/api/users/${id}/playlists2`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playlistId }),
          });

          //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
  
          if(!userResponse.ok) 
          {
            console.error('Error updating user playlists');
          }
  
          alert('Playlist deleted successfully');
          navigate(`/home/${id}`);
        } 
        else 
        {
          console.error('Error deleting playlist');
        }
        //<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>
      } 
      catch (error) 
      {
        console.error("Error deleting playlist:", error);
      }
    }
  };
  
  //---------------------------------------------------------------------------------------------------------

  if (!playlistData) return <div>Loading...</div>;

  return (
    <div className="bg-secondary text-white min-h-screen">
      <Header />
      <div className="p-4">
      {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}
      {isEditable && (
          <form onSubmit={handleEditPlaylist} className="space-y-4">
            <input
              type="text"
              value={editableFields.name}
              onChange={(e) => setEditableFields({ ...editableFields, name: e.target.value })}
              placeholder="Playlist Name"
              className="w-full p-2 rounded bg-gray-800"
            />

            {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

            <input
              value={editableFields.imageUrl}
              onChange={(e) => setEditableFields({ ...editableFields, imageUrl: e.target.value })}
              placeholder="Image URL"
              className="w-full p-2 rounded bg-gray-800"
            />

            {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

            <textarea
              value={editableFields.description}
              onChange={(e) => setEditableFields({ ...editableFields, description: e.target.value })}
              placeholder="Description"
              className="w-full p-2 rounded bg-gray-800"
            ></textarea>

            {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

            <input
              type="text"
              value={editableFields.hashtags}
              onChange={(e) => setEditableFields({ ...editableFields, hashtags: e.target.value })}
              placeholder="Hashtags (comma separated)"
              className="w-full p-2 rounded bg-gray-800"
            />

            {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

            <input
              type="text"
              value={editableFields.genre}
              onChange={(e) => setEditableFields({ ...editableFields, genre: e.target.value })}
              placeholder="Genre"
              className="w-full p-2 rounded bg-gray-800"
            />

            {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </form>
        )}
        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}
        <>
            <h1 className="text-3xl font-bold">{playlistData.name}</h1>
            <img src={playlistData.imageUrl} alt={playlistData.name} className="w-full h-64 object-cover" />
            <p className="mt-4">{playlistData.description}</p>
            <p className="mt-2 text-gray-400">Hashtags: {playlistData.hashtags.join(', ')}</p>
            <p className="mt-2 text-gray-400">Genre: {playlistData.genre}</p>
          </>
        
        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}
        <h2 className="text-xl mt-4">Songs</h2>
        <div>
          {songs.length > 0 ? ( // Use the fetched song details for rendering
            songs.map(song => (
              <div key={song._id} className="flex items-center justify-between">
                <Song
                  name={song.name}
                  artist={song.artist}
                  url={song.spotifyUrl}
                  date={song.timestamp}
                />
                {isEditable && (
                  <button 
                    onClick={() => handleDeleteSong(song._id)} 
                    className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No songs available.</p>
          )}
        </div>

        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

        {isEditable && (
          <div className="mt-4">
            <h3 className="text-lg">Add a New Song</h3>
            <form onSubmit={handleAddSong} className="flex">
              <input 
                type="text" 
                placeholder="Song Title" 
                value={newSong.name} 
                onChange={(e) => setNewSong({ ...newSong, name: e.target.value })} 
                className="mr-2 p-1" 
                required 
              />

              {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

              <input 
                type="text" 
                placeholder="Artist" 
                value={newSong.artist} 
                onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })} 
                className="mr-2 p-1" 
                required 
              />

              {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

              <input 
                type="url" 
                placeholder="Spotify URL" 
                value={newSong.spotifyUrl} 
                onChange={(e) => setNewSong({ ...newSong, spotifyUrl: e.target.value })} 
                className="mr-2 p-1" 
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Add Song</button>
            </form>
          </div>
        )}

        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

        <h2 className="text-xl mt-4">Comments</h2>
        <div className="mt-2">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-700 py-2">
                <p><strong>{comment.user}</strong>: {comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

        {!isEditable && (
          <form onSubmit={handleAddComment} className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 bg-gray-800 text-white rounded mb-2"
              required
            ></textarea>

            {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

            <input
              value={newCommentImage}
              onChange={(e) => setNewCommentImage(e.target.value)}
              placeholder="Image URL"
              className="w-full p-2 bg-gray-800 text-white rounded mb-2"
            />

            {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
              Add Comment
            </button>
          </form>
        )}

        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}

        {isEditable && (
          <button 
            onClick={handleDeletePlaylist} 
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Playlist
          </button>
        )}

        {/* <(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)> */}
      </div>
    </div>
  );
};

export default PlaylistPage;
