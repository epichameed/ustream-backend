const { off } = require("../app");
const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
  createSession: async (sessionId, token, userId, userType) => {
    try {
      console.log("in sessio");
      let session;

      session = await models.Sessions.create({
        sessionId: sessionId,
        userId: userId,
        token: token,
      });

      return {
        response: session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  getSessionByUserId: async (userId, userType) => {
    try {
      let session;

      session = await models.Sessions.findOne({
        where: {
          userId: userId,
        },
      });
      return {
        response: session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getSession: async (userId, token) => {
    try {
      const session = await models.Sessions.findOne({
        where: {
          userId: userId,
          token: token,
        },
      });
      return {
        response: session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  deleteSession: async (userId, userType) => {
    try {
      let session;

      session = await models.Sessions.destroy({
        where: {
          userId: userId,
        },
      });

      return {
        response: session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
};
