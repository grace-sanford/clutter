import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from '../../../server/api'; // Import the API router

const app: Application = express();

// const corsOptions = {
//   origin: "https://clutter-graces-projects-b8fb950d.vercel.app",
//   // `${"http://localhost:3000"}`, // Only allow requests from this origin
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   optionsSuccessStatus: 204, // No content for preflight OPTIONS request
// };
// app.use(cors(corsOptions));
// // app.use(cors());

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('Incoming Request:', req.method, req.url);
    console.log('Request Headers:', req.headers);
  
    let requestBody = '';
  
    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    });
  
    req.on('end', () => {
      console.log('Request Body:', requestBody);
      next();
    });
  });

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the API router for paths starting with "/api"
app.use('/api', apiRouter);

export default app;