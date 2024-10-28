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

export const updateGame = async (req, res) => {
  const { id } = req.params;
  const updateValues = req.body;

  try {
    const updatedGame = await queries.updateGame({ ...updateValues, id });
    if (updatedGame) {
      res.status(200).json(updatedGame);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating game' });
  }
};

export const updatePublisher = async (req, res) => {
  const { id } = req.params;
  const updateValues = req.body;

  try {
    const updatedPublisher = await queries.updatePublisher({ ...updateValues, id });
    if (updatedPublisher) {
      res.status(200).json(updatedPublisher);
    } else {
      res.status(404).json({ message: 'Publisher not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating publisher' });
  }
};

export const updateGenre = async (req, res) => {
  const { id } = req.params;
  const updateValues = req.body;

  try {
    const updatedGenre = await queries.updateGenre({ ...updateValues, id });
    if (updatedGenre) {
      res.status(200).json(updatedGenre);
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating genre' });
  }
};