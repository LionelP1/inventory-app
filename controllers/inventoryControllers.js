const queries = require('../db/queries');
const renderHelpers = require('./renderHelper');

const allowedTables = ['games', 'publishers', 'genres'];

// RENDERING ALL DATA
const renderAllData = async (req, res) => {
  const { tableName } = req.params;

  if (!allowedTables.includes(tableName)) {
    return renderHelpers.renderError(res, 'Invalid table name');
  }

  try {
    const rows = await queries.getAllRows(tableName);
    return renderHelpers.renderWithLayout(res, `All ${tableName}`, tableName, { rows });
  } catch (error) {
    console.error(error);
    return renderHelpers.renderError(res, 'Error retrieving games');
  }
};


// DELETING
const deleteGame = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRow = await queries.deleteGame(id);
    if (deletedRow) {
      return res.redirect('/games');
    } else {
      return renderHelpers.renderError(res, 'Game not found');
    }
  } catch (error) {
    console.error(error);
    return renderHelpers.renderError(res, 'Error deleting game');
  }
};

const deletePublisher = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRow = await queries.deletePublisher(id);
    if (deletedRow) {
      return res.redirect('/publishers');
    } else {
      return renderHelpers.renderError(res, 'Publisher not found');
    }
  } catch (error) {
    console.error(error);
    return renderHelpers.renderError(res, 'Error deleting publisher');
  }
};

const deleteGenre = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRow = await queries.deleteGenre(id);
    if (deletedRow) {
      return res.redirect('/genres');
    } else {
      return renderHelpers.renderError(res, 'Genre not found');
    }
  } catch (error) {
    console.error(error);
    return renderHelpers.renderError(res, 'Error deleting genre');
  }
};

// RENDERING FILTERED GAMES
const renderFilteredGames = async (req, res) => {
  const { gameTitle, publisherName, genreName } = req.query;

  try {
    const games = await queries.getGamesByFilters(gameTitle, publisherName, genreName);
    return renderHelpers.renderWithLayout(res, 'Games', 'gamePage', { games, gameTitle, publisherName, genreName });
  } catch (error) {
    console.error(error);
    return renderHelpers.renderError(res, 'Error retrieving games')
  }
};

// RENDERING DETAILS
const renderGameDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const gameDetails = await queries.getGameDetailsById(id);

    if (gameDetails) {
      return renderHelpers.renderWithLayout(res, 'Game Details', 'gameDetails', { gameDetails });
    } else {
      return renderHelpers.renderError(res, 'Game not found');
    }
  } catch (error) {
    console.error(error);
    return renderHelpers.renderError(res, 'Error retrieving game details');
  }
};

const renderPublisherDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const publisherDetails = await queries.getPublisherDetailsById(id);
    if (publisherDetails.length > 0) {
      return renderHelpers.renderWithLayout(res, 'Game Details', 'publisherDetails', { publisherDetails });
    } else {
      return renderHelpers.renderError(res, 'Publisher not found');
    }
  } catch (error) {
    console.error(error);
    return renderHelpers.renderError(res, 'Error retrieving publisher details');
  }
};

const renderGenreDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const genreDetails = await queries.getGenreDetailsById(id);

    if (genreDetails.length > 0) {
      return renderHelpers.renderWithLayout(res, 'Genre Details', 'genreDetails', { genreDetails });
    } else {
      return renderHelpers.renderError(res, 'Genre not found');
    }
  } catch (error) {
    console.error(error);
    return renderHelpers.renderError(res, 'Error retrieving genre details');
  }
};

 // RENDERING FORMS
const renderGameForm = async (req, res) => {
  const { id } = req.query;

  try {
    let game;
    if (id) { 
      game = await queries.getGameDetailsById(id);
      if (!game) {
        return renderHelpers.renderError(res, 'Game not found');
      }
    }
    return renderHelpers.renderWithLayout(res, 'Game Form', 'forms/gameForm', { game });
  } catch (error) {
    console.error('Error rendering game form:', error);
    return renderHelpers.renderError(res, 'Error rendering game form');
  }
};

const renderPublisherForm = async (req, res) => {
  const { id } = req.query;

  try {
    let publisher;
    if (id) {
      const publishers = await queries.getPublisherDetailsById(id);
      publisher = publishers[0];
      if (!publisher) {
        return renderHelpers.renderError(res, 'Publisher not found');
      }
    }
    return renderHelpers.renderWithLayout(res, 'Game Form', 'forms/publisherForm', { publisher });
  } catch (error) {
    console.error('Error rendering publisher form:', error);
    return renderHelpers.renderError(res, 'Error rendering publisher form');
  }
};

const renderGenreForm = async (req, res) => {
  const { id } = req.query;

  try {
    let genre;
    if (id) {
      const genres = await queries.getGenreDetailsById(id);
      genre = genres[0];
      if (!genre) {
        return renderHelpers.renderError(res, 'Genre not found');
      }
    }
    return renderHelpers.renderWithLayout(res, 'Game Form', 'forms/genreForm', { genre });
  } catch (error) {
    console.error('Error rendering genre form:', error);
    return renderHelpers.renderError(res, 'Error rendering genre form');
  }
};

// SUBMITTING FORMS
const submitGameForm = async (req, res) => {
  const action = req.body.action || req.query.action;
  const {title,  genre_id, publisher_id, release_date, image } = req.body;

  try {
      if (action === 'edit') {
        const { id } = req.query;
        await queries.updateGame({ id, title, release_date, publisher_id, genre_id, image });
      } else if (action === 'add') {
        await queries.insertRow('games', ['title', 'genre_id', 'publisher_id', 'release_date', 'image'], [title, genre_id, publisher_id, release_date, image]);
      }
      return res.redirect('/games');
  } catch (error) {
      console.error('Error rendering genre form:', error);
      return renderHelpers.renderError(res, 'Error processing the game submission');
  }
};

const submitPublisherForm = async (req, res) => {
  const action = req.body.action || req.query.action;
  const { name, image } = req.body;
 
  try {
    if (action === 'edit') {
      const { id } = req.query;
      await queries.updatePublisher({ id, name, image });
    } else if (action === 'add') {
      await queries.insertRow('publishers', ['name', 'image'], [name, image]);
    }
    return res.redirect('/publishers');
  } catch (error) {
    console.error('Error processing the publisher submission:', error);
    return renderHelpers.renderError(res, 'Error processing the publisher submission');
  }
};

const submitGenreForm = async (req, res) => {
  const action = req.body.action || req.query.action;
  const { name, image } = req.body;

  try {
      if (action === 'edit') {
          const { id } = req.query;
          await queries.updateGenre({ id, name, image });
      } else if (action === 'add') {
          await queries.insertRow('genres', ['name', 'image'], [name, image]);
      }
      return res.redirect('/genres');
  } catch (error) {
      console.error(error);
      return renderHelpers.renderError(res, 'Error processing the genre submission');
  }
};

const renderAddSection = (req, res) => {
  return renderHelpers.renderWithLayout(res, 'Add New', 'add');
};

// EXPORTING MODULE
module.exports = {
  renderAllData,
  deleteGame,
  deletePublisher,
  deleteGenre,
  renderFilteredGames,
  renderGameDetails,
  renderPublisherDetails,
  renderGenreDetails,
  renderGameForm,
  renderPublisherForm,
  renderGenreForm,
  submitGameForm,
  submitPublisherForm,
  submitGenreForm,
  renderAddSection
};
