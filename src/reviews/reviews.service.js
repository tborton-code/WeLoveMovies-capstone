const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCriticProperty = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function destroy(reviewId) {
  return knex("reviews")
    .where({review_id : reviewId})
    .del();
}

function read(reviewId){
    return knex("reviews")
        .where({review_id : reviewId})
        .first();
}

function update(updatedReview){
    return knex("reviews as r")
        .select("*")
        .where({review_id : updatedReview.review_id})
        .join("critics as c", "c.critic_id", "r.critic_id")
        .update(updatedReview, "*")
        .then(()=>{
            return knex("reviews as r")
                .select("*")
                .where({review_id : updatedReview.review_id})
                .join("critics as c", "c.critic_id", "r.critic_id")
                .first()
                .then(addCriticProperty)
        })
}

module.exports = {
    delete: destroy,
    read,
    update,
}