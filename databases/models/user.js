"use strict";
import { Model, DataTypes } from "sequelize";
import connection from '../connection'


const initUser = (sequelize, DataTypes) => {
  class User extends Model {

  }
  User.init(
    {
      email: { type: DataTypes.STRING, primaryKey: true },
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: 'user' },
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false
    }
  );
  return User;
};

export default initUser(connection, DataTypes);
