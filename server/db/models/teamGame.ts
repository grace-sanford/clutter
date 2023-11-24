import { DataTypes, Model, Sequelize } from 'sequelize';

interface TeamGameAttributes {
  PlayerID: number;
  GameID: number;
  Score: number;
}

class TeamGame extends Model<TeamGameAttributes> implements TeamGameAttributes {
  public PlayerID!: number;
  public GameID!: number;
  public Score!: number;
}

const initTeamGameModel = (sequelize: Sequelize) => {
  TeamGame.init(
    {
      PlayerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      GameID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Score: {
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
