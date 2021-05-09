import express from 'express';
import { createFakerr, getFakerr, uploadFile } from '../controllers/fakerrController.js';
import uploadMulter from '../middleware/excelMiddleware.js';



const router = express.Router()


router.post('/create', createFakerr);

// router.post('/get', getFakerr);
router.post('/get', getFakerr);
router.post('/uploadFile', uploadMulter.single("file"), uploadFile);





export default router;
