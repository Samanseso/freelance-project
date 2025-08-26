import { Router } from 'express'
import {
  getAllProjects,
  createProject,
  getProjectById
} from '../controllers/projectController.js'
import tasksRouter from './task.js'

const router = Router()

router.get('/', getAllProjects)
router.post('/', createProject)
router.get('/:id', getProjectById)

// Mount task routes under /projects/:projectId/tasks
router.use(
  '/:projectId/tasks',
  (req, res, next) => {
    req.projectId = req.params.projectId
    next()
  },
  tasksRouter
)

export default router
