import { DataTypes, Model, Sequelize } from 'sequelize';

interface TeamAttributes {
  id: number;
  name: string;
  gameId: number;
}

class Team extends Model<TeamAttributes> implements TeamAttributes {
  public id!: number;
  public name!: string;
  public gameId: number;
}

const initTeamModel = (sequelize: Sequelize) => {
  Team.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
      },
      gameId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Games', // This should match the actual model name of your Games table
          key: 'id',
        },
      }
    },
    {
      sequelize,
      modelName: 'Team',
      tableName: 'Teams',
    }
  );
};

export { Team, initTeamModel };