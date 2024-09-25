const { models } = require("./index");

module.exports = {
  createProject: async (body) => {
    try {
      const isProjectExists = await models.Projects.findOne({
        where: {
          title: body.title,
          clientName: body.clientName,
          clientUrl: body.clientUrl,
        },
      });
      if (isProjectExists) {
        return { success: false, error: "Same project already exists" };
      }
      const newProject = await models.Projects.create({
        projectId: body.projectId,
        clientName: body.clientName,
        clientUrl: body.clientUrl,
        title: body.title,
        description: body.description,
        deadline: body.deadline,
        contractDate: body.contractDate || new Date(),
        price: body.price,
        amountReceived: body.amountReceived,
        paymentType: body.paymentType,
        location: body.location,
      });
      return { response: newProject };
    } catch (error) {
      return {
        error: error.message || "Error occurred while creating the project",
      };
    }
  },
  updateProject: async ({ projectId, ...body }) => {
    try {
      const updatedProject = await models.Projects.update(
        {
          clientName: body.clientName,
          clientUrl: body.clientUrl,
          title: body.title,
          description: body.description,
          deadline: body.deadline,
          contractDate: body.contractDate || new Date(),
          price: body.price,
          amountReceived: body.amountReceived,
          paymentType: body.paymentType,
          location: body.location,
        },
        {
          where: {
            projectId: projectId,
          },
        }
      );

      if (!updatedProject) {
        return { error: "project doest not exist" };
      }
      return { response: updatedProject };
    } catch (error) {
      return { error: error };
    }
  },
  getProjectByProjectId: async (projectId) => {
    try {
      const project = await models.Projects.findOne({
        where: {
          projectId: projectId,
        },
      });
      return {
        response: project,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  getProjectsByUserId: async (userId) => {
    try {
      const project = await models.Projects.findAll({
        where: {
          userId: userId,
        },
        order: [["createdAt", "DESC"]],
      });
      return {
        response: project,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  deleteProject: async (projectId) => {
    try {
      const project = await models.Projects.destroy({
        where: {
          projectId: projectId,
        },
      });
      return {
        response: project,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
