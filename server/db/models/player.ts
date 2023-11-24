import { DataTypes, Model, Sequelize } from 'sequelize';

interface PlayerAttributes {
  ID: number;
  Username: string;
  Email: string;
  PasswordHash: string;
}

class PlayerModel extends Model<PlayerAttributes> implements PlayerAttributes {
  public ID!: number;
  public Username!: string;
  public Email!: string;
  public PasswordHash!: string;
}

const initPlayerModel1 = (sequelize: Sequelize) => {
  PlayerModel.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Username: {
        type: DataTypes.STRING(50),
      },
      Email: {
        type: DataTypes.STRING(50),
      },
      PasswordHash: {
        type: DataTypes.STRING(256),
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