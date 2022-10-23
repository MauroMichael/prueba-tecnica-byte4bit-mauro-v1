'use strict';
import {Model, DataTypes} from 'sequelize';
import connection from '../connection'

const initProducts = (sequelize, DataTypes) => {
  class Products extends Model {

  }
  Products.init(  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    image: { type: DataTypes.STRING },
    stripePrice: { type: DataTypes.STRING },
}, {
    sequelize,
    modelName: 'Products',
    tableName:'Products',
    timestamps: false
  });
  return Products;
};

export default initProducts(connection,DataTypes)