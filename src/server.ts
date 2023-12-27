import mongoose from 'mongoose';
import app from './app';

const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.qzfysez.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
