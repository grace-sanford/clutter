import { DataTypes, Model, Sequelize } from 'sequelize';

interface GameAttributes {
  ID: number;
  Name: string;
  Description: string;
}

class Game extends Model<GameAttributes> implements GameAttributes {
  public ID!: number;
  public Name!: string;
  public Description!: string;
}

const initGameModel = (sequelize: Sequelize) => {
  Game.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: DataTypes.STRING(50),
      },
      Description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Game',
      tableName: 'Games',
    }
  );
};

export { Game, initGameModel };
