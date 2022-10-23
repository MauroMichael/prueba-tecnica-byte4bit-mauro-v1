"use strict";
import { Model, DataTypes } from "sequelize";
import connection from '../connection'

const initOrder = (sequelize, DataTypes) => {
  class Order extends Model {
  
  }
  Order.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },    
    price: DataTypes.FLOAT,
    statusOrder: {type: DataTypes.STRING, defaultValue: 'Pending'},
    userId: DataTypes.STRING,
    checkOutId: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: false
  });
  return Order;
};

export default initOrder(connection, DataTypes);