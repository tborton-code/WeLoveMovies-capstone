const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


const addCriticProperty = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function list() {
  return knex("movies").select("*");
}

function listShowing(){
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("*")
        .where({"mt.is_showing" : true})
        .groupBy("m.movie_id");
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({"movie_id" : movieId})
        .then(array => array[0]);
}

function listTheaters(movieId) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .select("*")
        .where({"mt.movie_id" : movieId});
}

function listReviews(movieId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("*")
        .where({"r.movie_id" : movieId})
        .then(array => array.map(addCriticProperty));
}

module.exports = { 
    list,
    read,
    listTheaters,
    listReviews,
    listShowing
};