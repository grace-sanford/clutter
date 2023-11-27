const { Player, Game, Team, TeamGame } = require("./server/db");
const db = require("./server/db/database").default;
const Sequelize = require("sequelize")
const chalk = require('chalk');
const figlet = require('figlet');

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
  },
  {
    id: 2,
  },
];

const teams = [
  {
    id: 1,
    Name: "Team 1"
  },
  {
    id: 2,
    Name: "Team 2"
  }
]

// Sample player games
const teamGames = [
  {
    teamId: 1,
    gameId: 1,
    score: 100,
  },
  {
    teamId: 1,
    gameId: 2,
    score: 75,
  },
  {
    teamId: 2,
    gameId: 2,
    score: 100
  }
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    // Seed Teams
    await Team.bulkCreate(teams)

    // Seed Players
    await Player.bulkCreate(players);

    // Seed Games
    await Game.bulkCreate(games);

    await TeamGame.bulkCreate(teamGames);
  } catch (err) {
    console.error(err);
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