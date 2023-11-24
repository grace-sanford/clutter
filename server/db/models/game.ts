import { DataTypes, Model, Sequelize } from 'sequelize';

interface GameAttributes {
  ID: number;
}

class Game extends Model<GameAttributes> implements GameAttributes {
  public ID!: number;
}

const initGameModel = (sequelize: Sequelize) => {
  Game.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
