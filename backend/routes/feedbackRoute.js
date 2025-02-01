import express from 'express';
import { createFeedback, getFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/feedback', getFeedback);
router.post('/feedback', createFeedback);



export default router;
