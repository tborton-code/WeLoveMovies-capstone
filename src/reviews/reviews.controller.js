const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (!review) {
        return next({ status: 404, message: "Review cannot be found" });
    } else {
    return next();
    }
}

async function destroy(req, res, next) {
    const { reviewId } = req.params;
    await service.delete(reviewId);
    res.sendStatus(204)
}

async function update(req, res, next) {
    const updatedReview = {
        ...req.body.data,
        review_id: req.params.reviewId,
    };
    const review = await service.update(updatedReview);
    console.log("review", review)
    res.json({ data: review });
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), destroy],
    update: [asyncErrorBoundary(reviewExists), update],
}