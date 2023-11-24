const { Player, Game, Team, TeamGame } = require("./server/db");
const db = require("./server/db/database").default;
const Sequelize = require("sequelize")
const chalk = require('chalk');
const figlet = require('figlet');

// Sample players
const players = [
  {
    ID: 1,
    Username: "PeppaPig",
    Email: "pig@mickeymouseclubhouse.com",
    PasswordHash: "hashed_password_for_Peppa",
    TeamID: 1,
  },
  {
    ID: 2,
    Username: "SuzySheep",
    Email: "sheep@mickeymouseclubhouse.com",
    PasswordHash: "hashed_password_for_Suzy",
    TeamID: 2,
  },
];

// Sample games
const games = [
  {
    ID: 1,
  },
  {
    ID: 2,
  },
];

const teams = [
  {
    ID: 1,
    Name: "Team 1"
  },
  {
    ID: 2,
    Name: "Team 2"
  }
]

// Sample player games
const teamGames = [
  {
    TeamID: 1,
    GameID: 1,
    Score: 100,
  },
  {
    TeamID: 1,
    GameID: 2,
    Score: 75,
  },
  {
    TeamID: 2,
    GameID: 2,
    Score: 100
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