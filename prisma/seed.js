import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.game.deleteMany();
  await prisma.publisher.deleteMany();
  await prisma.genre.deleteMany();
  console.log("Existing data cleared.");
  

  // GENRES
  const sportGenre = await prisma.genre.create({
    data: {
      name: 'Sport',
      image: 'https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?t=st=1735531257~exp=1735534857~hmac=bc68e4034bf615ded8d3859147333d6f8040d7da01d04541d6d9077b31f866a9&w=740',
    },
  });

  const fantasyGenre = await prisma.genre.create({
    data: {
      name: 'Fantasy',
      image: 'https://img.freepik.com/free-photo/view-watercolor-dragon_23-2151749132.jpg?t=st=1735530099~exp=1735533699~hmac=a1c4790fa07b645215cfe2e8744eb7e72ec50ff189e5e966d39babaf7f91146c&w=740',
    },
  });

  const actionGenre = await prisma.genre.create({
    data: {
      name: 'Action',
      image: 'https://img.freepik.com/free-photo/full-shot-soldiers-fighting-war_23-2151002003.jpg?t=st=1735530299~exp=1735533899~hmac=36ab9bc914f25bc71f41373268c8167405ad28f27640e3dd98345aef25d6940c&w=740',
    },
  });
  const strategyGenre = await prisma.genre.create({
    data: {
      name: 'Strategy',
      image: 'https://img.freepik.com/premium-photo/chess-pieces-board-game_124595-409.jpg?w=740',
    },
  });

  const adventureGenre = await prisma.genre.create({
    data: {
      name: 'Adventure',
      image: 'https://img.freepik.com/free-photo/fantasy-style-scene-with-mountains-landscape_23-2151124346.jpg?t=st=1735530962~exp=1735534562~hmac=8adbc9a318de8feb025c47d3a4bc142d113f9f9bbefc5fc3f33da0ee9188055b&w=740',
    },
  });

  const racingGenre = await prisma.genre.create({
    data: {
      name: 'Racing',
      image: 'https://img.freepik.com/free-photo/automobile-racing-sports-competition_23-2150800017.jpg?t=st=1735529923~exp=1735533523~hmac=370bc75e294d993e499bb7d3b814a21564dc7c625135feec9fef98c9d724277c&w=740',
    },
  });

  // PUBLISHERS
  const eaSportsPublisher = await prisma.publisher.create({
    data: {
      name: 'EA Sports',
      image: 'https://images.igdb.com/igdb/image/upload/t_logo_med/cl4vv.png',
    },
  });

  const rockstarGamesPublisher = await prisma.publisher.create({
    data: {
      name: 'Rockstar Games',
      image: 'https://images.igdb.com/igdb/image/upload/t_logo_med/cl8g0.png',
    },
  });

  const theCreativeAssemblyPublisher = await prisma.publisher.create({
    data: {
      name: 'The Creative Assembly',
      image: 'https://images.igdb.com/igdb/image/upload/t_logo_med/o6o5mgw8vmtojqi510du.png',
    },
  });

  const fromSoftwarePublisher = await prisma.publisher.create({
    data: {
      name: 'FromSoftware',
      image: 'https://images.igdb.com/igdb/image/upload/t_logo_med/irwmnrvf0hny5wr0ap0d.png',
    },
  });

  const mobiusDigitalPublisher = await prisma.publisher.create({
    data: {
      name: 'Mobius Digital',
      image: 'https://images.igdb.com/igdb/image/upload/t_logo_med/cl39g.png',
    },
  });

  const playgroundGamesPublisher = await prisma.publisher.create({
    data: {
      name: 'Playground Games',
      image: 'https://images.igdb.com/igdb/image/upload/t_logo_med/cl7mf.png',
    },
  });

  // GAMES
  await prisma.game.create({
    data: {
      title: 'FIFA World',
      releaseDate: new Date('2013-08-10'),
      genreId: sportGenre.id,
      publisherId: eaSportsPublisher.id,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/diemodptyfk37ap6jwjq.webp',
    },
  });

  await prisma.game.create({
    data: {
      title: 'Elden Ring',
      releaseDate: new Date('2022-02-24'),
      genreId: fantasyGenre.id,
      publisherId: fromSoftwarePublisher.id,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.webp',
    },
  });

  await prisma.game.create({
    data: {
      title: 'Grand Theft Auto V',
      releaseDate: new Date('2013-09-16'),
      genreId: actionGenre.id,
      publisherId: rockstarGamesPublisher.id,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.webp',
    },
  });

  await prisma.game.create({
    data: {
      title: 'Total War: Warhammer III',
      releaseDate: new Date('2022-02-16'),
      genreId: strategyGenre.id,
      publisherId: theCreativeAssemblyPublisher.id,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2rze.webp',
    },
  });

  await prisma.game.create({
    data: {
      title: 'Outer Wilds',
      releaseDate: new Date('2019-05-28'),
      genreId: adventureGenre.id,
      publisherId: mobiusDigitalPublisher.id,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co65ac.webp',
    },
  });

  await prisma.game.create({
    data: {
      title: 'Forza Horizon 5',
      releaseDate: new Date('2021-11-08'),
      genreId: racingGenre.id,
      publisherId: playgroundGamesPublisher.id,
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3ofx.webp',
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
