import express from 'express';
import { create, list, update, remove} from '../controller/categoryController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', list);
router.post('/', authMiddleware, requireRole('admin'), create);
router.put('/:id', authMiddleware, requireRole('admin'), update);
router.delete('/:id', authMiddleware, requireRole('admin'), remove);