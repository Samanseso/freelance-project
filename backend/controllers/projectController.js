import Project from '../models/Project.js'

// GET /projects
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().lean()
    res.json(projects)
  } catch (err) {
    next(err)
  }
}

// POST /projects
export const createProject = async (req, res, next) => {
  try {
    const { title } = req.body
    const project = await Project.create({ title, createdBy: null })
    res.status(201).json(project)
  } catch (err) {
    next(err)
  }
}

// GET /projects/:id
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean()
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json(project)
  } catch (err) {
    next(err)
  }
}
