const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../bin/dbConnection");

class TeamMembers extends Model {}

TeamMembers.init(
  {
    teamMemberId: {
      primaryKey: true,
      type: DataTypes.STRING(255),
    },
    teamId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "teamMembers",
  }
);

module.exports = TeamMembers;
