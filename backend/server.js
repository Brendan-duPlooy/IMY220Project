import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import userRoutes from './routes/users.js';
import playlistRoutes from './routes/playlists.js';
import songRoutes from './routes/songs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("frontend/public"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve("frontend/public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
