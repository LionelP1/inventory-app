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

export const insertRow = async (req, res) => {
  const { tableName } = req.params;

  if (!allowedTables.includes(tableName)) {
    return res.status(400).json({ message: 'Invalid table name' });
  }

  const { columns, values } = req.body;

  try {
    await queries.insertRow(tableName, columns, values);
    res.status(201).json({ message: 'Row inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error inserting row' });
  }
};

export const deleteRow = async (req, res) => {
  const { tableName, id } = req.params;

  if (!allowedTables.includes(tableName)) {
    return res.status(400).json({ message: 'Invalid table name' });
  }

  try {
    const deletedRow = await queries.deleteRow(tableName, id);
    if (deletedRow) {
      res.status(200).json(deletedRow);
    } else {
      res.status(404).json({ message: 'Row not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting row' });
  }
};

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
