import express from 'express';
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from '../controllers/carController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/').get(getCars).post(protect, admin, upload.single('image'), createCar);
router
  .route('/:id')
  .get(getCarById)
  .delete(protect, admin, deleteCar)
  .put(protect, admin, upload.single('image'), updateCar);

export default router;
