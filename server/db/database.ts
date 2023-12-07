// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.
import { Sequelize } from "sequelize";
import pkg from "../../package.json";
require("pg");

const databaseUrl = process.env.DATABASE_URL;

// Development db
// const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
//   logging: false,
// });
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
console.log("databaseUrl>>>>>>>>>>>>>>", databaseUrl);
const db = new Sequelize(databaseUrl, {
  logging: (query, timing) => {
    console.log(query);
    console.log(timing);
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ciphers: "TLS_AES_128_GCM_SHA256",
    },
  },
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// const db = new Sequelize('clutter', 'clutter_user', 'WHloSu3Qw23BqgV5gVl11IvyMv0oMvPZ', {
//   host: 'dpg-clocbvogqk6s73e6qe2g-a.oregon-postgres.render.com',
//   dialect: 'postgres',
//   port: 5432,
//   logging: console.log,
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: false, // Add this line to disable certificate validation (for development only)
//     },
//   },
// });

export default db;
