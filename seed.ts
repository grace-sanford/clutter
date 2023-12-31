const { Player, Game, Team, Name } = require("./server/db");
const db = require("./server/db/database").default;
const Sequelize = require("sequelize");
const chalk = require("chalk");
const figlet = require("figlet");

// Sample players
const players = [
  {
    id: 1,
    username: "PeppaPig",
    teamId: 1,
  },
  {
    id: 2,
    username: "SuzySheep",
    teamId: 2,
  },
];

// Sample games
const games = [
  {
    id: 1,
    uuid: "ed933d70-d349-45d3-afa4-157c1a226b20",
  },
  {
    id: 2,
    uuid: "ed933d70-d349-45d3-afa4-157c1a226b21",
  },
];

const teams = [
  {
    id: 1,
    Name: "Team 1",
    gameId: 1,
  },
  {
    id: 2,
    Name: "Team 2",
    gameId: 2,
  },
  {
    id: 3,
    Name: "Team 3",
    gameId: 2,
  },
];

const names = [
  {
    id: 1,
    name: "John Doe",
    gameId: 1,
  },
  {
    id: 2,
    name: "Jane Doe",
    gameId: 1,
  },
];

const seed = async () => {
  try {
    console.log("Sequelize Version:", Sequelize.version);

    // Test database connection
    console.log("Testing database connection...");
    await db.authenticate();
    console.log("Database connection established successfully.");

    // Synchronize models
    console.log("Synchronizing database models...");
    await db.sync({ force: true });
    console.log("Database models synchronized successfully.");

    // Seed Games
    console.log("Seeding Games...");
    await Game.bulkCreate(games);
    console.log("Games seeded successfully");

    // Seed Teams
    console.log("Seeding Teams...");
    await Team.bulkCreate(teams);
    console.log("Teams seeded successfully");

    // Seed Players
    console.log("Seeding Players...");
    await Player.bulkCreate(players);
    console.log("Players seeded successfully");

    // Seed Names
    console.log("Seeding Names...");
    await Name.bulkCreate(names);
    console.log("Names seeded successfully");
  } catch (err) {
    console.error("Error during seeding:", err);
  }
};

// Run the seed function
async function runSeed() {
  try {
    await seed();
    const successMessage = "Seeding success!";
    figlet(successMessage, function (err: any, data: any) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(chalk.green(data));
    });
  } catch (err) {
    console.error(chalk.green("Oh noes! Something went wrong!"));
    console.error(err);
  } finally {
    db.close();
  }
}

// Run the seed function if the module is executed directly
if (require.main === module) {
  runSeed();
}
