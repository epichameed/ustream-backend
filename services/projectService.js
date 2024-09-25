const { v4: uuid } = require("uuid");
const projectModel = require("../models/projectModel");

module.exports = {
  createProject: async (body) => {
    try {
      body.projectId = uuid();
      // saving data in the db
      const newProject = await projectModel.createProject(body);

      if (newProject.error) {
        return { error: newProject.error };
      }

      return { response: newProject.response };
    } catch (error) {
      return { error: error.message };
    }
  },
  updateProject: async (body) => {
    try {
      const newProject = await projectModel.updateProject({ ...body });

      if (newProject.error || !newProject.response[0]) {
        return { error: newProject.error || newProject.response };
      }

      return { response: newProject.response };
    } catch (error) {
      return { error: error.message };
    }
  },
  getProjectByProjectId: async (query) => {
    try {
      const project = await projectModel.getProjectByProjectId(query.projectId);
      console.log("project", project);
      if (!project.response || project.error) {
        return {
          error: "project does not exist",
        };
      }

      return {
        response: project.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  getProjectsByUserId: async (query) => {
    try {
      const projects = await projectModel.getProjectsByUserId(query.userId);
      console.log("project", project);
      if (projects.length === 0 || projects.error) {
        return {
          error: "project does not exist",
        };
      }

      return {
        response: projects.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  deleteProject: async (query) => {
    try {
      const project = await projectModel.deleteProject(query.projectId);
      console.log("project", project);
      if (!project.response || project.error) {
        return {
          error: project.error || "No project exists with this projectId",
        };
      }

      return {
        response: project.response,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  },
};
