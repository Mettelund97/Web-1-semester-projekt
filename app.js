require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const webRoutes = require("./routes/web");
const path = require("path");
const cookieParser = require("cookie-parser");

// Init Express
const app = express();

// Environment variables
// const URL = process.env.URL || "0.0.0.0";
const PORT = process.env.PORT || 3000;

// Add this before your routes are used

app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
    helpers: {
      eq: function (v1, v2) {
        return v1 === v2;
      },
    },
  })
);

app.set("view engine", "hbs");

// Routes
app.use("/", webRoutes);

// Middleware for 404 error with custom Handlebars template
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
    hideSidebar: true,
  });
});

const stackSyncService = require("./services/stackSyncService.js");
stackSyncService.startSync().catch(console.error);

// Graceful shutdown
process.on("SIGTERM", () => {
  stackSyncService.stopSync();
  // Other cleanup code...
});

// Initialize server
app.listen(PORT, () => {
  if (!PORT) {
    console.error("The server is NOT running!");
  }
  console.log(`The server is running on port ${PORT}`);
});
