import express from 'express';
const router = express.Router();

// Import and use the individual route handlers
import gamesRouter from './game'; // Import the router

router.use('/games', gamesRouter); // Use the router

// If someone makes a request that starts with `/api`,
// but we DON'T have a corresponding router, this piece of
// middleware will generate a 404, and send it to our
// error-handling middleware!

router.use((req, res, next) => {
  const err: any = new Error('API route not found!');
  err.status = 404;
  next(err);
});

export default router;
