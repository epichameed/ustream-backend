const authService = require("../services/authService");
const joi = require("joi");

const loginSchema = joi.object().keys({
  email: joi.string().required().email().min(3).max(100),
  password: joi.string().required(),
  role: joi.string().required().valid("admin", "user"),
});

const signUpSchema = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().required().email().min(3).max(30),
  password: joi
    .string()
    .min(6) // Minimum length of 6 characters
    .pattern(new RegExp("(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>?])")) // Must contain at least one special character
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one special character.",
    }),
  role: joi.string().valid("user", "admin"),
});
module.exports = {
  test: async (req, res) => {
    try {
      //   const validate = await loginSchema.validateAsync(req.body);
      const testResponse = await authService.test();
      console.log("in controller", testResponse);
      if (testResponse.error) {
        return res.send({
          error: testResponse.error,
        });
      }

      //   res.cookie("auth", loginResponse.response);
      return res.send({
        response: testResponse.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const validate = await signUpSchema.validateAsync(req.body);
      const user = await authService.createUser(validate);
      if (user.error) {
        return res.send({
          error: user.error,
        });
      }
      return res.send({
        response: user.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  login: async (req, res) => {
    try {
      const validate = await loginSchema.validateAsync(req.body);
      const loginResponse = await authService.login(validate);

      if (loginResponse.error) {
        return res.send({
          error: loginResponse.error,
        });
      }

      console.log("Cookie Value:", loginResponse.response); // Log the cookie value

      res.cookie("auth", loginResponse.response, {
        maxAge: 60 * 60 * 1000,
      });

      return res.send({
        response: loginResponse.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  //   logout: async (req, res) => {
  //     try {
  //       const userId = req.user.userId;
  //       const logoutResponse = await authService.logout(userId);

  //       if (logoutResponse.error) {
  //         return res.send({
  //           error: logoutResponse.error,
  //         });
  //       }
  //       res.clearCookie("auth");

  //       return res.send({
  //         response: logoutResponse.response,
  //       });
  //     } catch (error) {
  //       return res.send({
  //         error: error,
  //       });
  //     }
  //   },
  //   signUp: async (req, res) => {
  //     try {
  //       const validate = await signUpSchema.validateAsync(req.body);
  //       const signUpResponse = await authService.signUp(validate);
  //       if (signUpResponse.error) {
  //         res.send({
  //           error: signUpResponse.error,
  //         });
  //       }
  //       res.send({
  //         response: signUpResponse.response,
  //       });
  //     } catch (error) {
  //       res.send({
  //         error: error,
  //       });
  //     }
  //   },
  //   forgotPassword: (req, res) => {
  //     try {
  //       const forgotPasswordResponse = authService.forgotPassword();
  //       if (forgotPasswordResponse.error) {
  //         res.send({
  //           error: forgotPasswordResponse.error,
  //         });
  //       }
  //       res.send({
  //         response: forgotPasswordResponse.response,
  //       });
  //     } catch (error) {
  //       res.send({
  //         error: error,
  //       });
  //     }
  //   },
  //   resetPassword: (req, res) => {
  //     try {
  //       const resetPasswordResponse = authService.resetPassword();
  //       if (resetPasswordResponse.error) {
  //         res.send({
  //           error: resetPasswordResponse.error,
  //         });
  //       }
  //       res.send({
  //         response: resetPasswordResponse.response,
  //       });
  //     } catch (error) {
  //       res.send({
  //         error: error,
  //       });
  //     }
  //   },
};
