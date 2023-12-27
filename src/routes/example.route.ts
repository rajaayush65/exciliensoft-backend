import express from 'express';
import { exampleResponse } from '../controllers/example.controller';

const router = express.Router();

router.get('/', exampleResponse);

export default router;
