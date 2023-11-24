import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api'; // Import the API router

const app: Application = express();

// Static middleware
app.use(express.static(__dirname + '/../public'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the API router for paths starting with "/api"
app.use('/api', apiRouter);

app.use(cors());
app.use(morgan('dev'));

// For all other routes, serve the index.html
app.use('*', (req, res) => {
  res.sendFile(__dirname + '/../public/index.html');
});

export default app;