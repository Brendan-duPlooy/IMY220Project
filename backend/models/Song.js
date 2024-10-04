import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  spotifyUrl: String,
  timestamp: { type: Date, default: Date.now },  // Automatically add timestamp
});

const Song = mongoose.model('Song', songSchema);
export default Song;
