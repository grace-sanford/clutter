import { Sequelize } from 'sequelize';
import db from './database';
import { PlayerModel as NewImportedPlayer, initPlayerModel1 } from './models/player';
import { Team as NewImportedTeam, initTeamModel } from "./models/team"
import { Game as NewImportedGame, initGameModel } from './models/game';
import { TeamGame as NewImportedTeamGame, initTeamGameModel } from './models/teamGame';
const seed = require("../../seed")

// Initialize the models
const Player = initPlayerModel1(db);
const Team = initTeamModel(db)
const Game = initGameModel(db);
const TeamGame = initTeamGameModel(db);

// Define associations
NewImportedPlayer.belongsTo(NewImportedTeam, { foreignKey: 'teamId' });
NewImportedTeam.hasMany(NewImportedPlayer, { foreignKey: 'teamId' });

NewImportedTeam.belongsToMany(NewImportedGame, { through: NewImportedTeamGame, as: 'relationship', onUpdate: 'CASCADE'  });
NewImportedGame.belongsToMany(NewImportedTeam, { through: NewImportedTeamGame, as: 'relationship', onUpdate: 'CASCADE' });


export { 
    NewImportedPlayer as Player, 
    NewImportedGame as Game, 
    NewImportedTeam as Team,
    NewImportedTeamGame as TeamGame, 
    db, 
    seed };