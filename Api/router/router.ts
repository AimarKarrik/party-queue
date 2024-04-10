import { Router } from 'express';
import searchController from '../controllers/searchController';
import queueController from '../controllers/queueController';

const router = Router();

router.use('/search', searchController);
router.use('/queue', queueController);

export default router;