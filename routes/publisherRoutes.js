const express = require('express');
const controllers = require('../controllers/inventoryControllers');
const validators = require('../controllers/validators');
const router = express.Router();

router.get('/publishers/form', controllers.renderPublisherForm);
router.post('/publishers/form', validators.validatePublisher, controllers.submitPublisherForm);
router.delete('/publishers/:id', controllers.deletePublisher);
router.get('/publishers/:id', controllers.renderPublisherDetails);

module.exports = router;