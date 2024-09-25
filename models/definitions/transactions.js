const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Transactions extends Model {}

Transactions.init(
  {
    transactionId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    projectId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "transactions",
  }
);

module.exports = Transactions;
