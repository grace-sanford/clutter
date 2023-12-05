import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api'; // Import the API router

const app: Application = express();

//the order of middleware matters in Express. Have to define the 
//cors middleware BEFORE the routes.
const corsOptions = {
  origin: `${process.env.NEXT_PUBLIC_API_URL}`, // Only allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204, // No content for preflight OPTIONS request
};

app.use(cors(corsOptions));

// Static middleware
// app.use(express.static(__dirname + '/../public'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the API router for paths starting with "/api"
app.use('/api', apiRouter);

app.use(morgan('dev'));

export default app;