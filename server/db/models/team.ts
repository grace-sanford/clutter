import { DataTypes, Model, Sequelize } from 'sequelize';

interface TeamAttributes {
  ID: number;
  Name: string;
}

class Team extends Model<TeamAttributes> implements TeamAttributes {
  public ID!: number;
  public Name!: string;
}

const initTeamModel = (sequelize: Sequelize) => {
  Team.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
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