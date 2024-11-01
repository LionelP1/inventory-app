const express = require('express');
const controllers = require('../controllers/inventoryControllers');
const validators = require('../controllers/validators');
const router = express.Router();

router.get('/games', controllers.renderFilteredGames);
router.get('/games/search', controllers.renderFilteredGames);
router.get('/games/form', controllers.renderGameForm);
router.post('/games/form',controllers.submitGameForm);
router.get('/games/:id', controllers.renderGameDetails);
router.delete('/games/:id', controllers.deleteGame);
module.exports = router;

