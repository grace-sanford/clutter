import { DataTypes, Model, Sequelize } from 'sequelize';

interface GameAttributes {
  id: number;
  uuid: string;
}

class Game extends Model<GameAttributes> implements GameAttributes {
  public id!: number;
  public uuid!: string;
}

const initGameModel = (sequelize: Sequelize) => {
  Game.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      uuid: {
        type: DataTypes.STRING(50),
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
