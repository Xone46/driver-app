const express = require('express')
const router = express.Router();
const driverControllers = require('../controllers/driverControllers');



router.route('/').get(driverControllers.index);
router.route('/').post(driverControllers.create);
router.route('/:id').get(driverControllers.select);
// router.route('/:id/update').put(driverControllers.update);
// router.route('/:id/delete').delete(driverControllers.delete);



module.exports = router;