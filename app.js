const express = require("express");
const exphbs = require("express-handlebars");
const webRoutes = require("./routes/web");
const path = require("path");

// Init Express
const app = express();

// Environment variables
// const URL = process.env.URL || "0.0.0.0";
const PORT = process.env.PORT || 3000;

// Add this before your routes are used

app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars engine
app.engine(
  "hbs",
  exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  
  })
);

app.set("view engine", "hbs");

// Routes
app.use("/", webRoutes);

// Middelware with error msg
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Initialize server
app.listen(PORT, () => {
  if (!PORT) {
    console.error("The server is NOT running!");
  }
  console.log(`The server is running on port ${PORT}`);
});
