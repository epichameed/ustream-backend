const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Projects extends Model {}

Projects.init(
  {
    projectId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },

    clientName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    clientUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contractDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT, // Suitable for storing dollar amounts
      allowNull: false,
    },
    paymentType: {
      type: DataTypes.ENUM("hourly", "fixed"),
      allowNull: true, // Ensure every project has a payment type
    },
    location: {
      type: DataTypes.STRING(255), // Location for the project
      allowNull: true, // Optional field
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "projects",
  }
);

module.exports = Projects;
