const express = require('express');
const controllers = require('../controllers/inventoryControllers');
const validators = require('../controllers/validators');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/games');
});
router.get('/add', controllers.renderAddSection);
router.get('/:tableName', controllers.renderAllData);

module.exports = router;

