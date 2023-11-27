import { DataTypes, Model, Sequelize } from 'sequelize';

interface TeamGameAttributes {
  playerId: number;
  gameId: number;
  score: number;
}

class TeamGame extends Model<TeamGameAttributes> implements TeamGameAttributes {
  public playerId!: number;
  public gameId!: number;
  public score!: number;
}

const initTeamGameModel = (sequelize: Sequelize) => {
  TeamGame.init(
    {
      playerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      gameId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      score: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'TeamGame',
      tableName: 'TeamGames',
    }
  );
};

export { TeamGame, initTeamGameModel };
