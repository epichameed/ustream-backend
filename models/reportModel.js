const { models } = require("./index");

module.exports = {
  createReport: async (reportData) => {
    try {
      console.log("in model", reportData);
      // Ensure that all necessary fields are included in reportData
      const newReport = await models.Reports.create({
        reportId: reportData.reportId, // Map fields explicitly
        userId: reportData.userId,
        numberConnectsUsedToday: reportData.connects,
        numberOfProposalsSent: reportData.proposals,
        viewsOnProposals: reportData.views,
        interviewsGotToday: reportData.interviews,
        projectsGotToday: reportData.projects,
        date: reportData.date,
      });
      return { response: newReport };
    } catch (error) {
      return { error: error.message };
    }
  },

  getReportByUserId: async (userId) => {
    try {
      const report = await models.Reports.findAll({
        where: {
          userId: userId,
        },
        order: [["date", "DESC"]], // Order by date in descending order
      });
      return {
        response: report,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  getReportByReportId: async (reportId) => {
    try {
      const report = await models.Reports.findOne({
        where: {
          reportId: reportId,
        },
      });
      return {
        response: report,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  deleteReport: async (reportId) => {
    try {
      const report = await models.Reports.destroy({
        where: { reportId: reportId },
      });
      return {
        response: report,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  updateReport: async ({ reportId, ...reportData }) => {
    try {
      console.log("in model", reportData);

      // check if userId is valid or not for error handling
      const isUserExist = await models.Users.findOne({
        where: { userId: reportData.userId },
      });
      if (!isUserExist) {
        throw new Error("Invalid userId given");
      }
      const updatedReport = await models.Reports.update(
        {
          reportId: reportData.reportId, // Map fields explicitly
          userId: reportData.userId,
          numberConnectsUsedToday: reportData.connects,
          numberOfProposalsSent: reportData.proposals,
          viewsOnProposals: reportData.views,
          interviewsGotToday: reportData.interviews,
          projectsGotToday: reportData.projects,
          date: reportData.date,
        },
        { where: { reportId: reportId } }
      );
      return { response: updatedReport };
    } catch (error) {
      return { error: error.message };
    }
  },

  // Add other methods for Reports model if needed
};
