// routes.js
const { Video } = require('./models');

app.get('/videos', async (req, res) => {
    try {
      const videos = await Video.find();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  app.get('/videos/:id', async (req, res) => {
    try {
      const video = await Video.findOne({ id: req.params.id });
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  
  
  
  
  

module.exports = { setupRoutes };
