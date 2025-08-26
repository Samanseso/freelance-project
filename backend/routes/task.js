import { Router } from 'express'
import {
  getTasksForProject,
  createTaskForProject,
  getTaskById
} from '../controllers/tasksController.js'

const router = Router({ mergeParams: true })

router.get('/', getTasksForProject)
router.post('/', createTaskForProject)
router.get('/:taskId', getTaskById)

export default router
