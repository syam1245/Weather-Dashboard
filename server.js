const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const compression = require("compression");

dotenv.config();

const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: [
          "wss://wft-geo-db.p.rapidapi.com",
          "https://wft-geo-db.p.rapidapi.com",
          "https://api.openweathermap.org",
          "http://localhost:5000",
          "https://weather-app-ackf.onrender.com",
        ],
      },
    },
  })
);

app.use(express.static(path.join(__dirname, "front-end", "build")));

const mongoURI = process.env.mongo_URI;

const connectWithRetry = async () => {
  try {
    await mongoose.connect(mongoURI, {});
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    console.log("Retrying connection in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry()
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
});

app.use("/api/login", loginRateLimiter);

app.use("/api", routes);

// Serve the React app
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "front-end", "build", "index.html"),
    (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("An error occurred while trying to serve the page.");
      }
    }
  );
});

const errorHandler = (err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    stack: process.env.NODE_ENV === "production" ? " " : err.stack,
  });
};

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  }
});

module.exports = server;
