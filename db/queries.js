const pool = require('./pool');

const getAllRows = async (tableName) => {
  const query = `SELECT * FROM ${tableName}`;
  const { rows } = await pool.query(query);
  return rows;
};

const deleteRow = async (tableName, id) => {
  const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const insertRow = async (tableName, columns, values) => {
    const columnList = columns.join(", ");
    
    //Created placeholders for SQL injection
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(", "); 
    
    const query = `INSERT INTO ${tableName} (${columnList}) VALUES (${placeholders})`;
    
    await pool.query(query, values);
};

const getGamesByFilters = async (gameTitle, publisherName, genreName) => {
  let query = `
    SELECT games.*, publishers.name AS publisher, genres.title AS genre
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
    conditions.push(`publishers.name ILIKE $${conditions.length + 1}`); // Corrected to use publisher name
    values.push(`%${publisherName}%`);
  }

  if (genreName) {
    conditions.push(`genres.title ILIKE $${conditions.length + 1}`);
    values.push(`%${genreName}%`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(' AND ');
  }

  const { rows } = await pool.query(query, values);
  return rows;
};

const getPublisherDetailsById = async (publisherId) => {
  const query = `
    SELECT publishers.*, games.title AS game_title, games.image AS game_image
    FROM publishers
    LEFT JOIN games ON publishers.id = games.publisher_id
    WHERE publishers.id = $1
  `;
  
  const { rows } = await pool.query(query, [publisherId]);
  return rows;
};

const getGenreDetailsById = async (genreId) => {
  const query = `
    SELECT genres.*, games.title AS game_title, games.image AS game_image
    FROM genres
    LEFT JOIN games ON genres.id = games.genre_id
    WHERE genres.id = $1
  `;
  
  const { rows } = await pool.query(query, [genreId]);
  return rows;
};

const getGameDetailsById = async (gameId) => {
  const query = `
    SELECT 
    games.*, genres.title AS genre_title, publishers.name AS publisher_name
    FROM games
    JOIN genres ON games.genre_id = genres.id
    JOIN publishers ON games.publisher_id = publishers.id
    WHERE games.id = $1
  `;

  const { rows } = await pool.query(query, [gameId]);
  return rows[0];
};


module.exports = {
  getAllRows,
  insertRow,
  deleteRow,
  getGamesByFilters,
  getPublisherDetailsById,
  getGenreDetailsById,
  getGameDetailsById,
};