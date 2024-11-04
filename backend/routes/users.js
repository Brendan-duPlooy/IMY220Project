import express from 'express';
import User from '../models/User.js';

const router = express.Router();

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// New user
router.post('/', async (req, res) => {
  const { name, email, password, bio, profileImageUrl } = req.body;

  const newUser = new User({ name, email, password, bio, profileImageUrl });

  try 
  {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } 
  catch (error) 
  {

    res.status(400).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try 
    {
      
      const user = await User.findOne({ email, password });
      if (!user) return res.status(401).json({ error: 'Invalid email or password' });
      
      res.status(200).json(user);
    } 
    catch (error) 
    {

      res.status(500).json({ error: error.message });
    }
  });

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Get users*
router.get('/', async (req, res) => {
  try 
  {
    const users = await User.find();

    res.status(200).json(users);
  } 
  catch(error) 
  {

    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Get user with ID
router.get('/:id', async (req, res) => {
  try 
  {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } 
  catch(error) 
  {
    res.status(500).json({ error: error.message });

  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Update user with ID
router.put('/:id', async (req, res) => {
  try 
  {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);


  } 
  catch (error) 
  {
    res.status(400).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// New playlistID
router.put('/:id/playlists', async (req, res) => {
    const { playlistId } = req.body;
  
    try 
    {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { playlists: playlistId } }, // ----------------------
        { new: true }
      );

  
      if(!updatedUser) return res.status(404).json({ error: 'User not found' });
  
      res.status(200).json(updatedUser);
    } 
    catch (error) 
    {
      res.status(500).json({ error: error.message });

    }
  });

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Delete user with ID
router.delete('/:id', async (req, res) => {
  try 
  {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });

    res.status(204).send();
  } 
  catch(error) 
  {

    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Remove playlistID
router.put('/:id/playlists2', async (req, res) => {
  const userId = req.params.id;
  const { playlistId } = req.body;

  try 
  {
    const user = await User.findById(userId);


    if (!user) 
    {
      return res.status(404).json({ message: 'User not found' });
    }

    user.playlists = user.playlists.filter(id => id !== playlistId);
    await user.save();


    res.status(200).json({ message: 'Playlist ID removed from user', playlists: user.playlists });
  } 
  catch(error) 
  {
    res.status(500).json({ message: 'Error updating user playlists', error });

  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Add requestFriend
router.put('/:id/requestFriend', async (req, res) => {
  const profileID = req.params.id; // reciever
  const { requesterId } = req.body; // sender

  try 
  {
    const updatedUser = await User.findByIdAndUpdate(
      profileID,
      { $addToSet: { requesting: requesterId } }, // --------------------------
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });


    res.status(200).json({ message: 'Friend request sent', user: updatedUser });
  } 
  catch(error) 
  {
    res.status(500).json({ error: error.message });

  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>

// Accept requestFriend
router.put('/:id/acceptFriend', async (req, res) => {
  const profileID = req.params.id; // accepter
  const { requesterId } = req.body; // sender

  try {
    const updatedUser = await User.findByIdAndUpdate(
      profileID,
      {
        $addToSet: { friends: requesterId },
        $pull: { requesting: requesterId }   

      },
      { new: true }
    );


    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    await User.findByIdAndUpdate(
      requesterId,
      { $addToSet: { friends: profileID } }, 
      { new: true }
    );



    res.status(200).json({ message: 'Friend request accepted', user: updatedUser });
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//<(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)><(030)>


export default router;
