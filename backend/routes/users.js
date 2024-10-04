import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, password, bio, profileImageUrl } = req.body;
  const newUser = new User({ name, email, password, bio, profileImageUrl });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login functionality
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, password });
      if (!user) return res.status(401).json({ error: 'Invalid email or password' });
      
      res.status(200).json(user); // If found, return the user object
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user's playlists by adding a new playlist ID
router.put('/:id/playlists', async (req, res) => {
    const { playlistId } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $push: { playlists: playlistId } }, // Add the playlist to the user's playlists array
        { new: true }
      );
  
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
