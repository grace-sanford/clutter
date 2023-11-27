import { DataTypes, Model, Sequelize } from 'sequelize';

interface TeamAttributes {
  id: number;
  name: string;
}

class Team extends Model<TeamAttributes> implements TeamAttributes {
  public id!: number;
  public name!: string;
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
    },
    {
      sequelize,
      modelName: 'Team',
      tableName: 'Teams',
    }
  );
};

export { Team, initTeamModel };