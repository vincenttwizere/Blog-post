import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';
import * as postController from '../controller/postController.js';


const router = express.Router();


// public
router.get('/', postController.listPublished);
router.get('/slug/:slug', postController.getBySlug);


// protected
router.use(authMiddleware);
router.get('/all', requireRole('admin','author'), postController.listAll);
router.post('/', requireRole('admin','author'), postController.createPost);
router.put('/:id', requireRole('admin','author'), postController.updatePost);
router.delete('/:id', requireRole('admin','author'), postController.deletePost);


export default router;