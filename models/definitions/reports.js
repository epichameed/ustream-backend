const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class Reports extends Model {}

Reports.init(
  {
    reportId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    numberConnectsUsedToday: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfProposalsSent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    viewsOnProposals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    interviewsGotToday: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectsGotToday: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY, // Stores only the date (without time)
      allowNull: false,
      defaultValue: DataTypes.NOW, // Default to current date if not provided
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "reports",
  }
);

module.exports = Reports;
