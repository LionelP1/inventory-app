const { body } = require('express-validator');


const validateGame = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required.'),

    body('releaseDate')
        .trim()
        .notEmpty().withMessage('Release Date is required.')
        .isISO8601().withMessage('Release Date must be valid (YYYY-MM-DD).'),

    body('image')
        .trim()
        .notEmpty().withMessage('Image URL is required.')
        .isURL().withMessage('Image must be a valid URL.'),

    body('publisherId')
        .trim()
        .notEmpty().withMessage('Publisher ID is required.')
        .isInt().withMessage('Publisher ID must be an integer.'),
        
    body('genreId')
        .trim()
        .notEmpty().withMessage('Genre ID is required.')
        .isInt().withMessage('Genre ID must be an integer.'),
];

// Validation for Publisher
const validatePublisher = [
    body('name')
        .trim()
        .notEmpty().withMessage('Publisher name is required.'),

    body('image')
        .trim()
        .notEmpty().withMessage('Image URL is required.')
        .isURL().withMessage('Image must be a valid URL.'),
];

const validateGenre = [
    body('name')
        .trim()
        .notEmpty().withMessage('Genre name is required.'),
    
    body('image')
        .trim()
        .notEmpty().withMessage('Image URL is required.')
        .isURL().withMessage('Image must be a valid URL.'),
];

module.exports = {
    validateGame,
    validatePublisher,
    validateGenre,
};
