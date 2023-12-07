const Sequelize = require("sequelize");

const databaseUrl = process.env.DATABASE_URL;
console.log("databaseUrl", databaseUrl)
const sequelize = new Sequelize('clutter', 'clutter_user', 'WHloSu3Qw23BqgV5gVl11IvyMv0oMvPZ', {
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

  async function testConnection() {
    try {
      console.log('Before authenticating...');
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    } finally {
      console.log('Connection closed.');
      await sequelize.close();
    }
  }

testConnection();
