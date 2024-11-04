import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  name: String,
  description: String,
  hashtags: [String],
  genre: String,
  imageUrl: String,
  creator: String,
  songs: [String],
  comments: [
    {
      user: String,
      comment: String,
      image: String,
    }
  ]
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
