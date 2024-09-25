const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Users extends Model {}

Users.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    status: {
      type: DataTypes.ENUM("active", "disabled"),
      allowNull: false,
      defaultValue: "active",
    },
    picture: {
      type: DataTypes.BLOB("long"), // Use BLOB for storing image data
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "users",
  }
);

module.exports = Users;
