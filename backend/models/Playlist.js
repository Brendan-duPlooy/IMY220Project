import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  hashtags: [String],
  genre: String,
  imageUrl: String,
  creator: String,  // User ID
  songs: [String],  // Array of song IDs
  comments: [
    {
      user: String,  // User ID
      comment: String,
      image: String,
    }
  ]
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
