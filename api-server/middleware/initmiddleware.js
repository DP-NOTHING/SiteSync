const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv");

function setupMiddlewares(app) {
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  dotenv.config();
}

module.exports.setupMiddlewares = setupMiddlewares;
