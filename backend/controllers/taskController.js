import Task from '../models/Task.js'

// GET /projects/:projectId/tasks
export const getTasksForProject = async (req, res, next) => {
  try {
    const tasks = await Task.find({ projectId: req.projectId }).lean()
    res.json(tasks)
  } catch (err) {
    next(err)
  }
}

// POST /projects/:projectId/tasks
export const createTaskForProject = async (req, res, next) => {
  try {
    const { title } = req.body
    const task = await Task.create({
      projectId: req.projectId,
      title,
      createdBy: null
    })
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

// GET /projects/:projectId/tasks/:taskId
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      projectId: req.projectId,
      _id: req.params.taskId
    }).lean()
    if (!task) return res.status(404).json({ error: 'Task not found' })
    res.json(task)
  } catch (err) {
    next(err)
  }
}
