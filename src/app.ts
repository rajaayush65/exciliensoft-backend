import express from 'express';
import exampleRouter from './routes/example.route';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Routes
app.use('/examples', exampleRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;