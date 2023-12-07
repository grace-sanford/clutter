// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.
import { Sequelize } from 'sequelize';
import pkg from '../../package.json';

const databaseUrl = process.env.DATABASE_URL;

// Development db
// const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
//   logging: false,
// });
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set.');
}


//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
// const db = new Sequelize(databaseUrl, {
//   logging: console.log,
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
// });

const db = new Sequelize('clutter', 'clutter_user', 'WHloSu3Qw23BqgV5gVl11IvyMv0oMvPZ', {
  host: 'dpg-clocbvogqk6s73e6qe2g-a.oregon-postgres.render.com',
  dialect: 'postgres',
  port: 5432,
  logging: console.log,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // Add this line to disable certificate validation (for development only)
    },
  },
});

export default db;
