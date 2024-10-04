import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  bio: String,
  friends: [String],  // Array of friend user IDs
  requesting: [String],  // Array of user IDs requesting friendship
  profileImageUrl: String,
  playlists: [String],  // Array of playlist IDs
});

const User = mongoose.model('User', userSchema);
export default User;
