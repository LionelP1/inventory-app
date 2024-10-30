const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL UNIQUE,
  image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS publishers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_date DATE,
  genre_id INTEGER REFERENCES genres(id),
  publisher_id INTEGER REFERENCES publishers(id),
  image_url VARCHAR(255)
);


INSERT INTO genres (title, image_url) VALUES
  ('Sport', 'https://pixune.com/wp-content/uploads/2023/10/FIFA.png.webp'),
  ('Puzzle', 'https://pixune.com/wp-content/uploads/2023/10/Puzzle.png.webp');

INSERT INTO publishers (name, image_url) VALUES
  ('EA Sports', 'https://images.igdb.com/igdb/image/upload/t_logo_med/cl4vv.png'),
  ('Rockstar Games ', 'https://images.igdb.com/igdb/image/upload/t_logo_med/cl8g0.png');

INSERT INTO games (title, release_date, genre_id, publisher_id, image_url) VALUES
  ('FIFA 21', '10/8/2020', 1, 1, 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wm2.webp');

`;

async function main() {
  console.log("Seeding database...");

  const client = new Client({
    connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users", // Update with your credentials
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main();
