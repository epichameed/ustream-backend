const { models } = require("./index");

module.exports = {
  createUser: async (body, userId) => {
    try {
      const user = await models.Users.create({
        userId,
        ...body,
      });
      return {
        response: user,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  login: async (body) => {
    let user; // Declare user outside the if-else block

    try {
      user = await models.Users.findOne({
        where: {
          email: body.email,
        },
      });

      console.log("this user", user.dataValues);

      return {
        response: user,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  getUserByEmail: async (email) => {
    try {
      const user = await models.Users.findOne({
        where: {
          email: email,
        },
      });
      return {
        response: user,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  //   login: async (email) => {
  //     try {
  //       const user = await models.Users.findOne({
  //         where: {
  //           email: email,
  //         },
  //         attributes: {
  //           exclude: ["createdAt", "updatedAt", "deletedAt"],
  //         },
  //       });
  //       return {
  //         response: user,
  //       };
  //     } catch (error) {
  //       return {
  //         error: error,
  //       };
  //     }
  //   },
  //   logout: async (email) => {
  //     try {
  //       // Check if the user is logged in before updating the status
  //       const isLoggedInResult = await userModel.isLoggedIn(email);

  //       if (isLoggedInResult.response) {
  //         // User is logged in, proceed with logout
  //         await models.Users.update({ isLoggedIn: false }, { where: { email } });

  //         return {
  //           response: `User with email ${email} is logged out`,
  //         };
  //       } else {
  //         return {
  //           error: `User with email ${email} is not logged in`,
  //         };
  //       }
  //     } catch (error) {
  //       return {
  //         error: error,
  //       };
  //     }
  //   },
  signUp: (body) => {
    try {
      return {
        response: body,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  //   forgotPassword: () => {
  //     try {
  //       return {
  //         response: "Your new password",
  //       };
  //     } catch (error) {
  //       return {
  //         error: error,
  //       };
  //     }
  //   },
  //   resetPassword: () => {
  //     try {
  //       return {
  //         response: "Your password is reset",
  //       };
  //     } catch (error) {
  //       return {
  //         error: error,
  //       };
  //     }
  //   },
};
