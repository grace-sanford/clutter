import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api'; // Import the API router

const app: Application = express();

//the order of middleware matters in Express. Have to define the 
//cors middleware BEFORE the routes.
const corsOptions = {
  origin: 'http://localhost:3000', // Only allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204, // No content for preflight OPTIONS request
};

app.use(cors(corsOptions));

// Static middleware
app.use(express.static(__dirname + '/../public'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the API router for paths starting with "/api"
app.use('/api', apiRouter);

app.use(morgan('dev'));

// For all other routes, serve the index.html
app.use('*', (req, res) => {
  res.sendFile(__dirname + '/../public/index.html');
});

export default app;