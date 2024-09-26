const reportService = require("../services/reportService.js");
const joi = require("joi");

// Schema for login validation
// Schema for user report validation
const userReportSchema = joi.object().keys({
  connects: joi.number().required().min(0),
  proposals: joi.number().required().min(0),
  views: joi.number().required().min(0),
  interviews: joi.number().required().min(0),
  projects: joi.number().required().min(0),
  userId: joi.string().required(), // Assuming userId is a string (UUID or other format)
  date: joi.date().required(), // Timestamp for when the report was created
});
const updateReportSchema = joi.object().keys({
  reportId: joi.string().required(),
  numberConnectsUsedToday: joi.number().min(0).required(),
  numberOfProposalsSent: joi.number().min(0).required(),
  viewsOnProposals: joi.number().min(0).required(),
  interviewsGotToday: joi.number().min(0).required(),
  projectsGotToday: joi.number().min(0).required(),
  userId: joi.string().required(), // Assuming userId is a string (UUID or other format)
  date: joi.date().required(), // Timestamp for when the report was created
});

const reportByUserIdSchema = joi.object().keys({
  userId: joi.string().required(), // Assuming userId is a string (UUID or other format)
});
const reportByReportIdSchema = joi.object().keys({
  reportId: joi.string().required(), // Assuming userId is a string (UUID or other format)
});
const deleteReport = joi.object().keys({
  reportId: joi.string().required(), // Assuming userId is a string (UUID or other format)
});

module.exports = {
  // API for creating a user report
  createReport: async (req, res) => {
    try {
      // Validate request body using Joi
      const validate = await userReportSchema.validateAsync(req.body);

      // Call the service to create the report
      const report = await reportService.createReport(validate);

      // If there is an error from the service, return the error response
      if (report.error) {
        return res.status(400).send({
          error: report.error,
        });
      }

      // Send a successful response
      return res.status(201).send({
        response: report.response,
      });
    } catch (error) {
      // Handle validation errors or other issues
      return res.status(500).send({
        error: error.message,
      });
    }
  },

  getReportByUserId: async (req, res) => {
    try {
      const validate = await reportByUserIdSchema.validateAsync(req.query);
      const report = await reportService.getReportByUserId(validate);
      console.log(req.query);
      if (report.error) {
        return res.status(400).send({
          error: report.error,
        });
      }
      return res.status(201).send({
        response: report.response,
      });
    } catch (error) {
      return res.status(400).send({
        error: error,
      });
    }
  },
  getReportByReportId: async (req, res) => {
    try {
      const validate = await reportByReportIdSchema.validateAsync(req.query);
      const report = await reportService.getReportByReportId(validate);
      if (report.error) {
        return res.status(404).send({
          error: report.error,
        });
      }
      return res.status(201).send({
        response: report.response,
      });
    } catch (error) {
      return res.status(400).send({
        error: error,
      });
    }
  },
  deleteReport: async (req, res) => {
    try {
      const validate = await deleteReport.validateAsync(req.query);
      const report = await reportService.deleteReport(validate);
      console.log(req.query);
      if (report.error) {
        return res.status(404).send({
          error: report.error,
        });
      }
      return res.status(201).send({
        response: "Report successfully deleted",
      });
    } catch (error) {
      return res.status(400).send({
        error: error,
      });
    }
  },
  updateReport: async (req, res) => {
    try {
      // Validate request body using Joi
      console.log("request", req.body);
      const validate = await updateReportSchema.validateAsync(req.body);
      console.log("validate", validate);

      // Call the service to create the report
      const report = await reportService.updateReport(validate);
      console.log("report", report);

      // If there is an error from the service, return the error response
      if (report.error) {
        console.log("in error");
        return res.status(400).send({
          error: report.error,
        });
      }

      // Send a successful response
      return res.status(201).send({
        response: "Report updated Successfully",
      });
    } catch (error) {
      // Handle validation errors or other issues
      return res.status(500).send({
        error: error.message,
      });
    }
  },
};
