const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/agenciaEmpleo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const videoSchema = new mongoose.Schema({
  id: String,
  title: String,
  sources: [String],
  description: String,
});

const Video = mongoose.model('Video', videoSchema);

const jsonData = JSON.parse(fs.readFileSync('assets/videos.json', 'utf-8'));

async function migrateData() {
  try {
    await Video.deleteMany(); // Borrar cualquier dato existente
    await Video.insertMany(jsonData);
    console.log('Data migrated successfully');
  } catch (error) {
    console.error('Error migrating data:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateData();
