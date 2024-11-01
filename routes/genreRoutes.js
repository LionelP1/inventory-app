const express = require('express');
const controllers = require('../controllers/inventoryControllers');
const validators = require('../controllers/validators');
const router = express.Router();

router.get('/genres/form', controllers.renderGenreForm);
router.post('/genres/form', validators.validateGenre, controllers.submitGenreForm);
router.delete('/genres/:id', controllers.deleteGenre);
router.get('/genres/:id', controllers.renderGenreDetails);

module.exports = router;