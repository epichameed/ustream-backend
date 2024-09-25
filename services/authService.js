const authModel = require("../models/authModel");
const sessionModel = require("../models/sessionModel");
const { v4: uuidV4 } = require("uuid");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const bcrypt = require("bcryptjs");
// const sessionModel = require("../models/sessionModel");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  test: async (body) => {
    try {
      //   const user = await authModel.login(body.email);
      //   if (user.error || !user.response) {
      //     return {
      //       error: "invalid credentials",
      //     };
      //   }
      //   const login = await bcrypt.compare(
      //     body.password,
      //     user.response.dataValues.password
      //   );
      //   if (!login) {
      //     return {
      //       error: "invalid credentials",
      //     };
      //   }
      //   const token = jwt.sign(user.response.dataValues, config.jwt.secret, {
      //     expiresIn: "1h",
      //   });
      //   const session = await sessionModel.getSessionByUserId(
      //     user.response.dataValues.userId
      //   );
      //   // if(session.error) {return {error: error "invalid user"}
      //   const userId = user.response.dataValues.userId;
      //   const deleteSession = await sessionModel.deleteSession(userId);
      //   if (deleteSession.error) {
      //     return {
      //       error: error,
      //     };
      //   }
      //   delete user.response.dataValues.password;

      //   const sessionId = uuidV4();

      //   const createSession = await sessionModel.createSession(
      //     sessionId,
      //     userId,
      //     token
      //   );
      //   if (createSession.error || !createSession.response) {
      //     return { error: "invalid user 234" };
      //   }

      return {
        response: "Successfull",
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  createUser: async (body) => {
    try {
      const userId = uuidv4();
      const isUser = await authModel.getUserByEmail(body.email);

      if (isUser.response || isUser.error) {
        return {
          error: "Email already exists",
        };
      }

      delete body.confirmPassword;
      body.password = await bcrypt.hash(body.password, 10);
      const user = await authModel.createUser(body, userId);

      if (user.error) {
        return {
          error: user.error,
        };
      }
      delete user.response.dataValues.password;
      return {
        response: user.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  login: async (body) => {
    try {
      const user = await authModel.login(body);
      if (user.error || !user.response) {
        return {
          error: "Invalid credentials",
        };
      }

      const login = await bcrypt.compare(
        body.password,
        user.response.dataValues.password
      );

      if (!login) {
        return {
          error: "Invalid credentials",
        };
      }

      // Remove password from the response
      delete user.response.dataValues.password;

      let userId;
      let userType;

      if (body.role === "user") {
        userId = user.response.dataValues.userId;
        userType = "user";
      } else if (body.role === "admin") {
        userId = user.response.dataValues.userId;
        userType = "admin";
      } else {
        return {
          error: "Invalid role",
        };
      }
      console.log("id", userId);

      const session = await sessionModel.getSessionByUserId(userId, userType);

      if (session.error) {
        return {
          error: session.error,
        };
      }
      console.log("session", session);

      const deleteSession = await sessionModel.deleteSession(userId, userType);

      if (deleteSession.error) {
        return {
          error: deleteSession.error,
        };
      }
      console.log("deleteSession", deleteSession);

      const token = jwt.sign(user.response.dataValues, config.jwt.secret, {
        expiresIn: "1h",
      });
      console.log("token", token);

      const sessionId = uuidV4();
      const createSession = await sessionModel.createSession(
        sessionId,
        token,
        userId,
        userType
      );
      console.log("createSession", createSession);

      if (createSession.error || !createSession.response) {
        return {
          error: "Invalid user",
        };
      }

      const Session = createSession.response.dataValues;
      Session.role = user.response.dataValues.role;
      Session.status = user.response.dataValues.status;
      Session.name = user.response.dataValues.name;
      Session.email = user.response.dataValues.email;

      return {
        response: Session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  //   logout: async (userId) => {
  //     try {
  //       // Assuming you have a valid userId
  //       const deleteSession = await sessionModel.deleteSession(userId);

  //       if (deleteSession.error) {
  //         return {
  //           error: deleteSession.error,
  //         };
  //       }

  //       return {
  //         response: "Logout successful",
  //       };
  //     } catch (error) {
  //       return {
  //         error: error,
  //       };
  //     }
  //   },
  //   signUp: async (body) => {
  //     try {
  //       // delete body.repeat_password;
  //       // body.password = await bcryptjs.hash(body.password,10)
  //       const signUpResponse = authModel.signUp(body);
  //       if (signUpResponse.error) {
  //         return {
  //           error: signUpResponse.error,
  //         };
  //       }
  //       return {
  //         response: signUpResponse.response,
  //       };
  //     } catch (error) {
  //       return {
  //         error: error,
  //       };
  //     }
  //   },
  //   forgotPassword: () => {
  //     try {
  //       const forgotPasswordResponse = authModel.forgotPassword();
  //       if (forgotPasswordResponse.error) {
  //         return {
  //           error: forgotPasswordResponse.error,
  //         };
  //       }
  //       return {
  //         response: forgotPasswordResponse.response,
  //       };
  //     } catch (error) {
  //       return {
  //         error: error,
  //       };
  //     }
  //   },
  //   resetPassword: () => {
  //     try {
  //       const resetPasswordResponse = authModel.resetPassword();
  //       if (resetPasswordResponse.error) {
  //         return {
  //           error: resetPasswordResponse.error,
  //         };
  //       }
  //       return {
  //         response: resetPasswordResponse.response,
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
};
