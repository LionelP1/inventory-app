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

};

const getGamesByFilters = async (gameTitle, publisherTitle, genreTitle) => {

};

module.exports = {
  getAllRows,
  insertRow,
  deleteRow,
  getGamesByFilters,
};