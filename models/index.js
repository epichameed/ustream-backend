const sequelize = require("../bin/dbConnection");
const Users = require("./definitions/users");
const Projects = require("./definitions/projects");
const Teams = require("./definitions/teams");
const TeamMembers = require("./definitions/teamMembers");
const Reports = require("./definitions/reports");
const Sessions = require("./definitions/sessions");
const Transactions = require("./definitions/transactions");

Users.hasMany(Reports, { foreignKey: "userId", onDelete: "CASCADE" });
Reports.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });

Projects.hasOne(Teams, { foreignKey: "projectId", onDelete: "CASCADE" });
Teams.belongsTo(Projects, { foreignKey: "projectId", onDelete: "CASCADE" });

Users.hasMany(TeamMembers, { foreignKey: "userId", onDelete: "CASCADE" });
TeamMembers.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });

Teams.hasMany(TeamMembers, { foreignKey: "teamId", onDelete: "CASCADE" });
TeamMembers.belongsTo(Teams, { foreignKey: "teamId", onDelete: "CASCADE" });

Users.hasMany(Projects, { foreignKey: "userId", onDelete: "CASCADE" });
Projects.belongsTo(Users, { foreignKey: "userId", onDelete: "CASCADE" });

Projects.hasMany(Transactions, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
});
Transactions.belongsTo(Projects, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
});

Users.hasOne(Sessions, {
  foreignKey: "userId", // Use userId as the foreign key for Users
  constraints: false,
  scope: {
    sessionType: "user",
  },
  as: "session",
  onDelete: "CASCADE",
});

Sessions.belongsTo(Users, {
  foreignKey: "userId", // Use userId as the foreign key for Users
  constraints: false,
  as: "userSession",
});

const db = {};

db.sequelize = sequelize;
sequelize.models = {
  Users,
  Projects,
  Teams,
  TeamMembers,
  Reports,
  Sessions,
  Transactions,
};

module.exports = { db, models: sequelize.models };
