// require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
  },

  testing: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
  },

  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
    },
    seeds: { directory: "./seeds" },
  },
};
