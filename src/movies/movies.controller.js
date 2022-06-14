const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const {movieId} = req.params;
    const movie = await service.read(movieId);
    if (!movie) {
        return next({ status: 404, message: "Movie not found" });
    } else {
        res.locals = movie;
        return next();
    }
}


async function list(req, res, next) {
    if (req.query.is_showing) {
        const data = await service.listShowing();
        res.json({ data });
    } else {
        const data = await service.list()
        res.json({ data });
    }
}

async function read(req, res, next) {
    const data = res.locals;
    res.json({ data });
}

async function listTheaters(req, res, next) {
    const data = await service.listTheaters(req.params.movieId)
    res.json({ data });
}

async function listReviews(req, res, next) {
    const data = await service.listReviews(req.params.movieId)
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    listTheaters: asyncErrorBoundary(listTheaters),
    listReviews: asyncErrorBoundary(listReviews),
}