import { DataTypes, Model, Sequelize } from 'sequelize';

interface PlayerAttributes {
  id?: number;
  username: string;
  teamId: number;
}

class PlayerModel extends Model<PlayerAttributes> implements PlayerAttributes {
  public id?: number;
  public username!: string;
  public teamId!: number;
}

const initPlayerModel1 = (sequelize: Sequelize) => {
  PlayerModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(50),
      },
      teamId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Player',
      tableName: 'Players',
    }
  );
};

export { PlayerModel, initPlayerModel1 };