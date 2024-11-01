require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const inventoryRoutes = require("./routes/inventoryRoutes");
const gameRoutes = require("./routes/gameRoutes");
const publisherRoutes = require("./routes/publisherRoutes");
const genreRoutes = require("./routes/genreRoutes");

app.use("/", gameRoutes);
app.use("/", publisherRoutes);
app.use("/", genreRoutes);
app.use("/", inventoryRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
