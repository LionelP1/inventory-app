const express = require('express');
const controllers = require('../controllers/inventoryControllers');
const router = express.Router();

router.get('/:tableName', controllers.renderAllData);

router.post('/add/:tableName', controllers.insertRow);

router.delete('/delete/:tableName/:id', controllers.deleteRow);

router.get('/games/', controllers.renderFilteredGames);

router.get('/publishers/:id', controllers.renderPublisherDetails);

router.get('/genres/:id', controllers.renderGenreDetails);

router.get('/games/:id', controllers.renderGameDetails);

module.exports = router;

