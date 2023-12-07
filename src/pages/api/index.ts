import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from '../../../server/api'; // Import the API router

const app: Application = express();

// const corsOptions = {
//   origin: '*',
//   // "https://clutter-graces-projects-b8fb950d.vercel.app",
//   // `${"http://localhost:3000"}`, // Only allow requests from this origin
//   methods: '*',
//   optionsSuccessStatus: 204, // No content for preflight OPTIONS request
// };
// app.use(cors(corsOptions));
app.use(cors());

app.use(morgan('dev'));

// Body parsing middleware
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming request bodies
app.use((req, res, next) => {
    let requestBody = '';
  
    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    });
  
    req.on('end', () => {
      console.log('Request Body:', requestBody);
      next();
    });
});

app.post("/api/games", async (req, res) => {
    try {
      console.log('Entered the serverless function')
  
      res.status(201).send(await Game.create({ uuid: req.body.uuid }));
    } catch (error) {
      console.error("Error getting games:", error);
      res.status(400).json({ error: "Error creating game" });
    }
  });

// Use the API router for paths starting with "/api"
// app.use('/api', apiRouter);

export default app;