const { v4: uuidV4 } = require("uuid"); // Import UUID function
const { models } = require("../models/index.js");
const reportModel = require("../models/reportModel.js");

module.exports = {
  createReport: async (body) => {
    try {
      console.log("in service", body);
      // First, check if a report for the user and date already exists
      const existingReport = await models.Reports.findOne({
        where: {
          userId: body.userId,
          date: body.date || new Date(), // Use the provided date or the current date
        },
      });

      if (existingReport) {
        // If a report exists, return an error message
        return {
          error: "A report for this user on the specified date already exists.",
        };
      }

      // Generate a UUID for the reportId
      const reportId = uuidV4();

      // Prepare the report data with the generated UUID
      const reportData = {
        reportId: reportId,
        userId: body.userId,
        connects: body.connects || 0,
        proposals: body.proposals || 0,
        views: body.views || 0,
        interviews: body.interviews || 0,
        projects: body.projects || 0,
        date: body.date || new Date(),
      };

      // Create a new report with the reportData
      const report = await reportModel.createReport(reportData);
      console.log("report of service", report);

      if (report.error) {
        return { error: report.error };
      }

      // Return success response after successful report creation
      return { response: report.response };
    } catch (error) {
      return { error: error.message };
    }
  },

  getReportByUserId: async (query) => {
    try {
      const report = await reportModel.getReportByUserId(query.userId);
      console.log("report", report);
      if (!report.response || report.error) {
        return {
          error: "User does not exist",
        };
      }

      return {
        response: report.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  getReportByReportId: async (query) => {
    try {
      const report = await reportModel.getReportByReportId(query.reportId);
      console.log("report", report);
      if (!report.response || report.error) {
        return {
          error: "Report does not exist",
        };
      }

      return {
        response: report.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  deleteReport: async (query) => {
    try {
      const report = await reportModel.deleteReport(query.reportId);
      console.log(report, "report");
      if (!report.response || report.error) {
        return {
          error: "Report does not exist",
        };
      }

      return {
        response: report.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },

  updateReport: async (body) => {
    try {
      // Prepare the report data with the generated UUID
      const reportData = {
        reportId: body.reportId,
        userId: body.userId,
        connects: body.numberConnectsUsedToday || 0,
        proposals: body.numberOfProposalsSent || 0,
        views: body.viewsOnProposals || 0,
        interviews: body.interviewsGotToday || 0,
        projects: body.projectsGotToday || 0,
        date: body.date || new Date(),
      };

      // Create a new report with the reportData
      const report = await reportModel.updateReport({ ...reportData });
      console.log("report of service", report);

      if (report.error || !report.response[0]) {
        return { error: report.error || "No report updated" };
      }

      // Return success response after successful report creation
      return { response: report.response };
    } catch (error) {
      return { error: error.message };
    }
  },
};
