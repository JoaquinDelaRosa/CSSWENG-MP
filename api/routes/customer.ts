import express = require('express');
import controller from '../controllers/customer';

const router = express.Router();

router.get('/all', controller.all);
router.get('/id', controller.id);
router.post('/create', controller.create);
router.post('/update', controller.update);
router.delete('/delete', controller.remove);
router.get('/filter', controller.filter);

export default router;