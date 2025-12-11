import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import requireRole from '../middleware/roleMiddleware.js';
import {listAll,listPublished,getBySlug} from '../controller/postController.js';



const router = express.Router();


// public
router.get('/', listPublished);
router.get('/slug/:slug', getBySlug);


// protected
router.use(authMiddleware);
router.get('/all', requireRole('admin','author'), listAll);
// router.post('/', requireRole('admin','author'), createPost);
// router.put('/:id', requireRole('admin','author'), postController.updatePost);
// router.delete('/:id', requireRole('admin','author'), postController.deletePost);


export default router;