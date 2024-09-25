const joi = require("joi");
const projectService = require("../services/projectService");

const createProjectSchema = joi.object().keys({
  userId: joi.string().required(),
  clientName: joi.string().required(),
  clientUrl: joi.string().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  deadline: joi.date().required(),
  contractDate: joi.date().required(),
  price: joi.number().required().min(0),
  amountReceived: joi.object({
    amount: joi.number().required().min(0),
    time: joi.string().required(),
  }),
  paymentType: joi.string().valid("hourly", "fixed").required(),
  location: joi.string(),
});

const updateProjectSchema = joi.object().keys({
  projectId: joi.string().required(),
  userId: joi.string().required(),
  clientName: joi.string().required(),
  clientUrl: joi.string().required(),
  title: joi.string().required(),
  description: joi.string().required(),
  deadline: joi.date().required(),
  contractDate: joi.date().required(),
  price: joi.number().min(0).required(),
  amountReceived: joi.object({
    amount: joi.number().required().min(0),
    time: joi.string().required(),
  }),
  paymentType: joi.string().valid("hourly", "fixed").required(),
  location: joi.string(),
});

const projectByProjectIdSchema = joi.object().keys({
  projectId: joi.string().required(),
});
const projectByUserIdSchema = joi.object().keys({
  userId: joi.string().required(),
});
const deleteProjectSchema = joi.object().keys({
  projectId: joi.string().required(),
});

module.exports = {
  createProject: async (req, res) => {
    try {
      const validate = await createProjectSchema.validateAsync(req.body);

      const newProject = await projectService.createProject(validate);
      if (newProject.error) {
        return res.status(400).send({
          success: false,
          error: newProject.error,
        });
      }
      return res.status(200).send({
        success: true,
        message: "Project created successfully",
        response: newProject.response,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  },

  updateProject: async (req, res) => {
    try {
      const validate = await updateProjectSchema.validateAsync(req.body);

      const newProject = await projectService.updateProject(validate);
      if (newProject.error) {
        return res.status(404).send({
          success: false,
          error: newProject.error,
        });
      }
      return res.status(200).send({
        success: true,
        response: newProject.response,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  },
  getProjectByProjectId: async (req, res) => {
    try {
      const validate = await projectByProjectIdSchema.validateAsync(req.query);
      const project = await projectService.getProjectByProjectId(validate);
      if (project.error) {
        return res.status(404).send({
          error: project.error,
        });
      }
      return res.status(201).send({
        response: project.response,
      });
    } catch (error) {
      return res.status(400).send({
        error: error,
      });
    }
  },
  getProjectsByUserId: async (req, res) => {
    try {
      const validate = await projectByUserIdSchema.validateAsync(req.query);
      const projects = await projectService.getProjectsByUserId(validate);
      if (projects.error) {
        return res.status(404).send({
          error: projects.error,
        });
      }
      return res.status(201).send({
        response: projects.response,
      });
    } catch (error) {
      return res.status(400).send({
        error: error,
      });
    }
  },
  deleteProject: async (req, res) => {
    try {
      const validate = await deleteProjectSchema.validateAsync(req.query);
      const project = await projectService.deleteProject(validate);
      if (project.error) {
        return res.status(404).send({
          error: project.error,
        });
      }
      return res.status(201).send({
        response: project.response,
      });
    } catch (error) {
      return res.status(400).send({
        error: error,
      });
    }
  },
};
