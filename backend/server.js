require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configurar encabezados CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const videoSchema = new mongoose.Schema({
  id: String,
  title: String,
  sources: [String],
  description: String,
});

const Video = mongoose.model('Video', videoSchema);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Rutas de la API
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/videos', async (req, res) => {
  const video = new Video(req.body);
  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findOne({ id: req.params.id });
    if (video == null) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Corregir método PUT para actualizar un video
app.put('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (video == null) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/videos/:id', async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({ id: req.params.id });
    if (video == null) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
