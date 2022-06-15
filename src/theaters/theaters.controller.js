const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getAll(req, res, next) {
  const reviews = await service.getAll();
  res.json({ data: reviews });
}

module.exports={
    getAll,
}