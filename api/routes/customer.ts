import express = require('express');
import validateToken from '../middleware/authValidation';
import controller from '../controllers/customer';
import { ALL_ROLES } from '../models/enum';

const router = express.Router();

router.get('/all', validateToken, controller.all);
router.get('/id', controller.id);
router.post('/create', controller.create);
router.post('/update', controller.update);
router.delete('/delete', controller.remove);
router.get('/filter', controller.filter);

export default router;