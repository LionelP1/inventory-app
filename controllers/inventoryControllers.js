const queries = require('../queries/gameQueries');

const allowedTables = ['games', 'publishers', 'orders'];

export const getAllRows = async (req, res) => {
  const { tableName } = req.params;

  if (!allowedTables.includes(tableName)) {
    return res.status(400).json({ message: 'Invalid table name' });
  }

  try {
    const rows = await queries.getAllRows(tableName);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving data' });
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
