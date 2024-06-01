const catchError = require('../utils/catchError');
const Review = require('../models/Review');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const { hotelId, offset, perPage } = req.query;
    const where = {};
    if (hotelId !== undefined) where.hotelId = hotelId;
    const results = await Review.findAll({
      include: [User],
      where: where,
      offset: offset,
      limit: perPage

    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { rating, comment, hotelId } = req.body;
    const result = await Review.create({
        rating,
        comment,
        userId: req.user.id,
        hotelId
    });
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Review.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const result = await Review.update({
            rating,
            comment
        },
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    remove,
    update
}