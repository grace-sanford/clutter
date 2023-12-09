// The sole purpose of this module is to establish a connection to a
// Postgres database by creating a Sequelize instance (called `db`).
import { Sequelize } from "sequelize";
require("pg");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
const db = new Sequelize(databaseUrl, {
  logging: (query, timing) => {
    console.log(query);
    console.log(timing);
  },
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default db;
