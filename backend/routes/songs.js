import express from 'express';
import Song from '../models/Song.js';

const router = express.Router();

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// New song
router.post('/', async (req, res) => {
  const { name, artist, spotifyUrl } = req.body;

  const newSong = new Song({ name, artist, spotifyUrl });

  try 
  {
    const songs = await newSong.save();
    res.status(201).json(songs);

  } 
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Get songs*
router.get('/', async (req, res) => {
  try 
  {
    const songs = await Song.find();
    res.status(200).json(songs);

  } 
  catch(error) 
  {

    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Get song with ID
router.get('/:id', async (req, res) => {
  try 
  {
    const song = await Song.findById(req.params.id);

    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.status(200).json(song);

  }
   catch (error) 
   {
    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Update song with ID
router.put('/:id', async (req, res) => {
  try 
  {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedSong) return res.status(404).json({ error: 'Song not found' });
    res.status(200).json(updatedSong);
  } 
  catch(error) 
  {
    res.status(400).json({ error: error.message });

  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Delete song with ID
router.delete('/:id', async (req, res) => {
  try 
  {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);


    if (!deletedSong) return res.status(404).json({ error: 'Song not found' });
    res.status(204).send();
  } 
  catch (error) 
  {

    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

export default router;
