// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.
import { sql } from '@vercel/postgres';

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

const db = new Sequelize(databaseUrl, {
  logging: true,
});


export default db;
