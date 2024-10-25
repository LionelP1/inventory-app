const express = require('express');
const controllers = require('../controllers/inventoryControllers');

const router = express.Router();

router.get('/:tableName', getAllRows);

router.post('/:tableName', insertRow);

router.delete('/:tableName/:id', deleteRow);

router.get('/games/search', getGames);

router.get('/publishers/:id', getPublisher);

router.get('/genres/:id', getGenre);

router.get('/games/:id', getGame);

module.exports = router;
