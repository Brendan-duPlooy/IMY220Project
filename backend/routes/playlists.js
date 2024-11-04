import express from 'express';
import Playlist from '../models/Playlist.js';
import Song from '../models/Song.js';

const router = express.Router();

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// New playlist
router.post('/', async (req, res) => {
  const { name, description, hashtags, genre, imageUrl, creator } = req.body;
  const newPlaylist = new Playlist({ name, description, hashtags, genre, imageUrl, creator });

  try 
  {
    const savedPlaylist = await newPlaylist.save();

    res.status(201).json(savedPlaylist);
  } 
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Get playlists*
router.get('/', async (req, res) => {
  try 
  {
    const playlists = await Playlist.find().populate('songs');

    res.status(200).json(playlists);
  } 
  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Get playlist with ID
router.get('/:id', async (req, res) => {
  try 
  {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    res.status(200).json(playlist);
  } 
  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Update playlist with ID
router.put('/:id', async (req, res) => {
  try 
  {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedPlaylist) return res.status(404).json({ error: 'Playlist not found' });
    res.status(200).json(updatedPlaylist);
  } 
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Delete playlist with ID
router.delete('/:id', async (req, res) => {
  try 
  {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
    if (!deletedPlaylist) return res.status(404).json({ error: 'Playlist not found' });

    res.status(204).send();
  } 
  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// +song to playlist
router.post('/:playlistId/songs', async (req, res) => {
  const { songId } = req.body;
  try 
  {
    const playlist = await Playlist.findById(req.params.playlistId);
    if(!playlist) return res.status(404).json({ error: 'Playlist not found' });
    if(playlist.songs.includes(songId)) 
      {
      return res.status(400).json({ message: 'Song already exists in the playlist.' });
    }

    playlist.songs.push(songId);
    await playlist.save();
    res.status(200).json(playlist);
  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// -song from playlist
router.delete('/:playlistId/songs/:songId', async (req, res) => {
  try 
  {
    const playlist = await Playlist.findById(req.params.playlistId);

    if(!playlist) return res.status(404).json({ error: 'Playlist not found' });

    playlist.songs = playlist.songs.filter(song => song.toString() !== req.params.songId);
    await playlist.save();
    res.status(204).send();

  } 
  catch (error) 
  {
    res.status(500).json({ message: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// +comment to playlist
router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { user, comment } = req.body;

  try 
  {
    const playlist = await Playlist.findById(id);
    if(!playlist) 
      {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    playlist.comments.push({ user, comment });
    await playlist.save();

    res.status(201).json(playlist);
  } 
  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

export default router;
