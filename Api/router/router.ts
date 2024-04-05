import { Router } from 'express';
import searchController from '../controllers/searchController';

const router = Router();

router.use('/search', searchController);

export default router;