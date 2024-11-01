const queries = require('../db/queries');

const allowedTables = ['games', 'publishers', 'genres'];

// RENDERING ALL DATA
const renderAllData = async (req, res) => {
  const { tableName } = req.params;

  if (!allowedTables.includes(tableName)) {
    return res.status(400).json({ message: 'Invalid table name' });
  }

  try {
    const rows = await queries.getAllRows(tableName);
    res.render(tableName, { rows });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error retrieving data' });
  }
};


// DELETING
const deleteGame = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRow = await queries.deleteGame(id);
    if (deletedRow) {
      res.status(200).json(deletedRow);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting game' });
  }
};

const deletePublisher = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRow = await queries.deletePublisher(id);
    if (deletedRow) {
      res.status(200).json(deletedRow);
    } else {
      res.status(404).json({ message: 'Publisher not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting publisher' });
  }
};

const deleteGenre = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRow = await queries.deleteGenre(id);
    if (deletedRow) {
      res.status(200).json(deletedRow);
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting genre' });
  }
};

// RENDERING FILTERED GAMES
const renderFilteredGames = async (req, res) => {
  const { gameTitle, publisherName, genreName } = req.query;

  try {
    const games = await queries.getGamesByFilters(gameTitle, publisherName, genreName);
    res.render('gamePage', { games, gameTitle, publisherName, genreName });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error retrieving games' });
  }
};

// RENDERING DETAILS
const renderGameDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const gameDetails = await queries.getGameDetailsById(id);

    if (gameDetails) {
      res.render('gameDetails', { gameDetails });
    } else {
      res.status(404).render('error', { message: 'Game not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error retrieving game details' });
  }
};

const renderPublisherDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const publisherDetails = await queries.getPublisherDetailsById(id);
    if (publisherDetails.length > 0) {
      res.render('publisherDetails', { publisherDetails })
    } else {
      res.status(404).json({ message: 'Publisher not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving publisher details' });
  }
};

const renderGenreDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const genreDetails = await queries.getGenreDetailsById(id);

    if (genreDetails.length > 0) {
      res.render('genreDetails', { genreDetails });
    } else {
      res.status(404).render('error', { message: 'Genre not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error retrieving genre details' });
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
        return res.status(404).render('error', { message: 'Game not found' });
      }
    }
    res.render('forms/gameForm', { game }); 
  } catch (error) {
    console.error('Error rendering game form:', error);
    res.status(500).render('error', { message: 'Error rendering game form' });
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
        return res.status(404).render('error', { message: 'Publisher not found' });
      }
    }
    res.render('forms/publisherForm', { publisher });
  } catch (error) {
    console.error('Error rendering publisher form:', error);
    res.status(500).render('error', { message: 'Error rendering publisher form' });
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
        return res.status(404).render('error', { message: 'Genre not found' });
      }
    }
    res.render('forms/genreForm', { genre });
  } catch (error) {
    console.error('Error rendering genre form:', error);
    res.status(500).render('error', { message: 'Error rendering genre form' });
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
      console.error(error);
      return res.status(500).render('error', { message: 'Error processing the game submission' });
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
    return res.status(500).render('error', { message: 'Error processing the publisher submission' });
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
      return res.status(500).render('error', { message: 'Error processing the genre submission' });
  }
};

const renderAddSection = (req, res) => {
  res.render('add');
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
