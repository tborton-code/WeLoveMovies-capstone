const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function getAll() {
  return knex("theaters")
    .select("*")
    // .then(mapProperties);
}

module.exports = {
    getAll,
}