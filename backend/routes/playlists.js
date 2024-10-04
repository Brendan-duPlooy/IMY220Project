import express from 'express';
import Playlist from '../models/Playlist.js';

const router = express.Router();

// Create a new playlist
router.post('/', async (req, res) => {
  const { name, description, hashtags, genre, imageUrl, creator } = req.body;
  const newPlaylist = new Playlist({ name, description, hashtags, genre, imageUrl, creator });

  try {
    const savedPlaylist = await newPlaylist.save();
    res.status(201).json(savedPlaylist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a playlist by ID
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a playlist by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlaylist) return res.status(404).json({ error: 'Playlist not found' });
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Delete a playlist by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
    if (!deletedPlaylist) return res.status(404).json({ error: 'Playlist not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;