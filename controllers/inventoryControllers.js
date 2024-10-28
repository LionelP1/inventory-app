const queries = require('../queries/gameQueries');

const allowedTables = ['games', 'publishers', 'orders'];

export const renderAllData = async (req, res) => {
  const { tableName } = req.params;

  if (!allowedTables.includes(tableName)) {
    return res.status(400).json({ message: 'Invalid table name' });
  }

  try {
    const rows = await queries.getAllRows(tableName);
    res.render(tableName, { rows });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error retrieving data' }); // Render an error page if there's an error
  }
};

// DELETING
export const deleteGame = async (req, res) => {
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

export const deletePublisher = async (req, res) => {
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

export const deleteGenre = async (req, res) => {
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


//RENDERING FILTERED GAMES
export const renderFilteredGames = async (req, res) => {
  const { gameTitle, publisherName, genreName } = req.query;

  try {
    const games = await queries.getGamesByFilters(gameTitle, publisherName, genreName);
    res.render('games', { games });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error retrieving games' });
  }
};


// RENDERING DETAILS
export const renderGameDetails = async (req, res) => {
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

export const renderPublisherDetails = async (req, res) => {
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

export const renderGenreDetails = async (req, res) => {
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
export const renderGameForm = (req, res) => {
  try {
    res.render('gameForm');
  } catch (error) {
    console.error('Error rendering game form:', error);
    res.status(500).render('error', { message: 'Error rendering game form' });
  }
};

export const renderPublisherForm = (req, res) => {
  try {
    res.render('publisherForm');
  } catch (error) {
    console.error('Error rendering publisher form:', error);
    res.status(500).render('error', { message: 'Error rendering publisher form' });
  }
};

export const renderGenreForm = (req, res) => {
  try {
    res.render('genreForm');
  } catch (error) {
    console.error('Error rendering genre form:', error);
    res.status(500).render('error', { message: 'Error rendering genre form' });
  }
};


// SUBMITTING FORMS
export const submitGameForm = async (req, res) => {
  const { action, id, title, releaseDate, publisherId, genreId } = req.body;

  try {
      if (action === 'edit') {
          await queries.updateGame({ id, title, releaseDate, publisherId, genreId });
      } else if (action === 'add') {
          await queries.insertRow('games', ['title', 'releaseDate', 'publisherId', 'genreId'], [title, releaseDate, publisherId, genreId]);
      }
      return res.redirect('/games');
  } catch (error) {
      console.error(error);
      return res.status(500).render('error', { message: 'Error processing the game submission' });
  }
};

export const submitPublisherForm = async (req, res) => {
  const { action, id, name } = req.body;

  try {
      if (action === 'edit') {
          await queries.updatePublisher({ id, name });
      } else if (action === 'add') {
          await queries.insertRow('publishers', ['name'], [name]);
      }
      return res.redirect('/publishers');
  } catch (error) {
      console.error(error);
      return res.status(500).render('error', { message: 'Error processing the publisher submission' });
  }
};

export const submitGenreForm = async (req, res) => {
  const { action, id, name } = req.body;

  try {
      if (action === 'edit') {
          await queries.updateGenre({ id, name });
      } else if (action === 'add') {
          await queries.insertRow('genres', ['name'], [name]);
      }
      return res.redirect('/genres');
  } catch (error) {
      console.error(error);
      return res.status(500).render('error', { message: 'Error processing the genre submission' });
  }
};