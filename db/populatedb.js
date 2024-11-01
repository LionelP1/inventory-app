require('dotenv').config(); 
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS publishers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_date DATE,
  genre_id INTEGER REFERENCES genres(id),
  publisher_id INTEGER REFERENCES publishers(id),
  image VARCHAR(255)
);
`;

const genreInsertSQL = `
INSERT INTO genres (name, image) VALUES
  ('Sport', 'https://pixune.com/wp-content/uploads/2023/10/FIFA.png.webp'),
  ('Puzzle', 'https://pixune.com/wp-content/uploads/2023/10/Puzzle.png.webp');
`;

const publisherInsertSQL = `
INSERT INTO publishers (name, image) VALUES
  ('EA Sports', 'https://images.igdb.com/igdb/image/upload/t_logo_med/cl4vv.png'),
  ('Rockstar Games', 'https://images.igdb.com/igdb/image/upload/t_logo_med/cl8g0.png');
`;

const gameInsertSQL = `
INSERT INTO games (title, release_date, genre_id, publisher_id, image) VALUES
  ('FIFA 21', '2020-08-10', 1, 1, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wm2.webp');
`;

async function main() {
  console.log("Seeding database...");

  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
  });

  try {
    await client.connect();
    
    await client.query(SQL);

    await client.query('TRUNCATE TABLE games, publishers, genres RESTART IDENTITY CASCADE;');

    await client.query(genreInsertSQL);
    await client.query(publisherInsertSQL);
    await client.query(gameInsertSQL);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main();
