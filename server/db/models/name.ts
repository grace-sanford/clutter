import { DataTypes, Model, Sequelize } from 'sequelize';

interface NameAttributes {
  id: number;
  name: string;
  gameId: number;
}

class NameModel extends Model<NameAttributes> implements NameAttributes {
  public id!: number;
  public name!: string;
  public gameId!: number;
}

const initNameModel = (sequelize: Sequelize) => {
  NameModel.init(
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
      }
    },
    {
      sequelize,
      modelName: 'Name',
      tableName: 'Names',
    }
  );
};

export { NameModel, initNameModel };