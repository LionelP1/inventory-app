const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllRows = async (tableName) => {
  const query = `SELECT * FROM ${tableName}`;
  const result = await prisma.$queryRawUnsafe(query);
  return result;
};

const deleteGame = async (gameId) => {
  const query = `DELETE FROM games WHERE id = $1 RETURNING *`;
  const result = await prisma.$queryRaw(query, gameId);
  return result[0];
};

const deletePublisher = async (publisherId) => {
  const deleteGamesQuery = `DELETE FROM games WHERE publisher_id = $1`;
  await prisma.$queryRaw(deleteGamesQuery, publisherId);

  const deletePublisherQuery = `DELETE FROM publishers WHERE id = $1 RETURNING *`;
  const result = await prisma.$queryRaw(deletePublisherQuery, publisherId);

  return result[0];
};

const deleteGenre = async (genreId) => {
  const deleteGamesQuery = `DELETE FROM games WHERE genre_id = $1`;
  await prisma.$queryRaw(deleteGamesQuery, genreId);

  const deleteGenreQuery = `DELETE FROM genres WHERE id = $1 RETURNING *`;
  const result = await prisma.$queryRaw(deleteGenreQuery, genreId);

  return result[0];
};

const insertRow = async (tableName, columns, values) => {
  const columnList = columns.join(`, `);
  const placeholders = columns.map((_, index) => `$${index + 1}`).join(`, `);
  const query = `INSERT INTO ${tableName} (${columnList}) VALUES (${placeholders})`;
  await prisma.$queryRawUnsafe(query, ...values);
};

const getGamesByFilters = async (gameTitle, publisherName, genreName) => {
  let query = `
    SELECT games.*, publishers.name AS publisher, genres.name AS genre
    FROM games
    JOIN publishers ON games.publisher_id = publishers.id
    JOIN genres ON games.genre_id = genres.id
  `;

  const conditions = [];
  const values = [];

  if (gameTitle) {
    conditions.push(`games.title ILIKE $${conditions.length + 1}`);
    values.push(`%${gameTitle}%`);
  }

  if (publisherName) {
    conditions.push(`publishers.name ILIKE $${conditions.length + 1}`);
    values.push(`%${publisherName}%`);
  }

  if (genreName) {
    conditions.push(`genres.name ILIKE $${conditions.length + 1}`);
    values.push(`%${genreName}%`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(' AND ');
  }

  const result = await prisma.$queryRawUnsafe(query, ...values);
  return result;
};


const getPublisherDetailsById = async (publisherId) => {
  const query = `
    SELECT publishers.*, games.title AS game_title, games.image AS game_image, games.id AS game_id
    FROM publishers
    LEFT JOIN games ON publishers.id = games.publisher_id
    WHERE publishers.id = $1
  `;
  
  const result = await prisma.$queryRaw(query, publisherId);
  return result;
};

const getGenreDetailsById = async (genreId) => {
  const query = `
    SELECT genres.*, games.title AS game_title, games.image AS game_image, games.id AS game_id
    FROM genres
    LEFT JOIN games ON genres.id = games.genre_id
    WHERE genres.id = $1
  `;
  
  const result = await prisma.$queryRaw(query, genreId);
  return result;
};

const getGameDetailsById = async (gameId) => {
  const query = `
    SELECT 
      games.*, genres.name AS genre_name, publishers.name AS publisher_name
    FROM games
    JOIN genres ON games.genre_id = genres.id
    JOIN publishers ON games.publisher_id = publishers.id
    WHERE games.id = $1
  `;

  const result = await prisma.$queryRaw(query, gameId);
  return result[0];
};

const updateGame = async (updateValues) => {
  const { id, title, release_date, publisher_id, genre_id, image } = updateValues;
  
  const query = `
    UPDATE games 
    SET 
      title = $1, 
      release_date = $2, 
      publisher_id = $3, 
      genre_id = $4, 
      image = $5
    WHERE id = $6
    RETURNING *`;

  const result = await prisma.$queryRaw(query, title, release_date, publisher_id, genre_id, image, id);
  return result[0];
};

const updatePublisher = async (updateValues) => {
  const { id, name, image } = updateValues;
  
  const query = `
    UPDATE publishers
    SET 
      name = $1, 
      image = $2
    WHERE id = $3
    RETURNING *`;

  const result = await prisma.$queryRaw(query, name, image, id);
  return result[0];
};

const updateGenre = async (updateValues) => {
  const { id, name, image } = updateValues;
  
  const query = `
    UPDATE genres
    SET 
      name = $1, 
      image = $2
    WHERE id = $3
    RETURNING *`;

  const result = await prisma.$queryRaw(query, name, image, id);
  return result[0];
};

const doesGenreIdExist = async (genreId) => {
  const query = `
    SELECT 1 FROM genres WHERE id = $1
  `;
  
  const result = await prisma.$queryRawUnsafe(query, genreId);
  return result.length > 0;
};

const doesPublisherIdExist = async (publisherId) => {
  const query = `
    SELECT 1 FROM publishers WHERE id = $1
  `;
  
  const result = await prisma.$queryRawUnsafe(query, publisherId);
  return result.length > 0;
};

module.exports = {
  getAllRows,
  insertRow,
  deleteGame,
  deletePublisher,
  deleteGenre,
  getGamesByFilters,
  getPublisherDetailsById,
  getGenreDetailsById,
  getGameDetailsById,
  updateGame,
  updatePublisher,
  updateGenre,
  doesGenreIdExist,
  doesPublisherIdExist,
};
