import { DataTypes, Model, Sequelize } from 'sequelize';

interface GameAttributes {
  id: number;
}

class Game extends Model<GameAttributes> implements GameAttributes {
  public id!: number;
}

const initGameModel = (sequelize: Sequelize) => {
  Game.init(
    {
      id: {
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
