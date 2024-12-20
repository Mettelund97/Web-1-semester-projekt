require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const webRoutes = require("./routes/web");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel.js");

// Init Express
const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;

// Add this before your routes are used
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async (req, res, next) => {
  if (req.cookies.authToken) {
    try {
      const decoded = jwt.verify(req.cookies.authToken, process.env.JWT_SECRET);
      const user = await userModel.getUserById(decoded.id);
      res.locals.user = user;
    } catch (error) {
      console.error("Error setting user info:", error);
    }
  }
  next();
});

// Static files middleware
app.use(express.static(path.join(__dirname, "public")));

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

app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
    hideSidebar: true,
  });
});

const stackSyncService = require("./services/stackSyncService.js");
stackSyncService.startSync().catch(console.error);

process.on("SIGTERM", () => {
  stackSyncService.stopSync();
});

// Initialize server
app.listen(PORT, () => {
  if (!PORT) {
    console.error("The server is NOT running!");
  }
  console.log(`The server is running on port ${PORT}`);
});
