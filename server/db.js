const knex = require("knex");
require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

const db = knex({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}@127.0.0.1:5432/acfaq`,
  searchPath: "public",
});

module.exports = db;
