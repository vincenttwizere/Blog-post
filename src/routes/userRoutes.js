import express from 'express';
import { listUsers, createAuthor, deleteUser } from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', requireRole('admin'), listUsers);
router.post('/author', requireRole('admin'), createAuthor);
router.delete('/:id', requireRole('admin'), deleteUser);

export default router;