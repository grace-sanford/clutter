import { Sequelize } from 'sequelize';
import db from './database';
import { PlayerModel as NewImportedPlayer, initPlayerModel1 } from './models/player';
import { Team as NewImportedTeam, initTeamModel } from "./models/team"
import { Game as NewImportedGame, initGameModel } from './models/game';
import { NameModel as NewImportedName, initNameModel } from './models/names';
const seed = require("../../seed")

// Initialize the models
const Player = initPlayerModel1(db);
const Team = initTeamModel(db)
const Game = initGameModel(db);
const Name = initNameModel(db);

// Define associations
//A single player belongs to a single team
NewImportedPlayer.belongsTo(NewImportedTeam, { foreignKey: 'teamId' });
//A single team has many players
NewImportedTeam.hasMany(NewImportedPlayer, { foreignKey: 'teamId' });

//A single team belongs to a single game
NewImportedTeam.belongsTo(NewImportedGame, { foreignKey: 'gameId' });

//A single game has many teams
NewImportedGame.hasMany(NewImportedTeam, { foreignKey: 'gameId' });

//A single name belongs to a single game
NewImportedName.belongsTo(NewImportedGame, {foreignKey: 'gameId'})
//A single game has many names
NewImportedGame.hasMany(NewImportedName, {foreignKey: 'gameId'})


export { 
    NewImportedPlayer as Player, 
    NewImportedGame as Game, 
    NewImportedTeam as Team,
    NewImportedName as Name, 
    db, 
    seed };