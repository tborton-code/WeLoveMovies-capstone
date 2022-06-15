const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function getAll(req, res, next) {
  const theaters = await service.getAll();
  res.json({ data: theaters });
}

module.exports={
    getAll,
}