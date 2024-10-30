const express = require('express');
const controllers = require('../controllers/inventoryControllers');
const router = express.Router();

// Routes for deleting
router.delete('/games/:id', controllers.deleteGame);
router.delete('/publishers/:id', controllers.deletePublisher);
router.delete('/genres/:id', controllers.deleteGenre);

// Routes for rendering data
router.get('/games', controllers.renderFilteredGames);
router.get('/:tableName', controllers.renderAllData);
router.get('/games/search', controllers.renderFilteredGames);
router.get('/games/:id', controllers.renderGameDetails);
router.get('/publishers/:id', controllers.renderPublisherDetails);
router.get('/genres/:id', controllers.renderGenreDetails);
router.get('/add', controllers.renderAddSection);

// Routes for rendering forms
router.get('/games/form', controllers.renderGameForm);
router.get('/publishers/form', controllers.renderPublisherForm);
router.get('/genres/form', controllers.renderGenreForm);

// Routes for submitting forms
router.post('/games/form', validators.validateGame, controllers.submitGameForm);
router.post('/publishers/form', validators.validatePublisher, controllers.submitPublisherForm);
router.post('/genres/form', validators.validateGenre, controllers.submitGenreForm);

module.exports = router;

