const Gig = require("../models/gig");
const newError = require("../utils/createError");
const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller) {
      return next(newError("Only sellers can create new gigs", 403));
    }
    const newGig = await Gig.create({ ...req.body, userId: req.id });
    return res.json("Created a new gig");
  } catch (error) {
    next(error);
  }
};
const deleteGig = async (req, res, next) => {
  try {
    const gigId = req.params.id;
    const gig = await Gig.findById(gigId);
    // console.log(gigId , req.)

    if (gig.userId != req.id) {
      return next(newError("You can delete only your gigs", 403));
    }
    await Gig.findByIdAndDelete(gigId);
    res.status(200).send("Gig has been deleted!");
  } catch (error) {
    next(error);
  }
};
const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return next(newError("Gig not found!", 404));
    }
    return res.status(200).json(gig);
  } catch (error) {
    next(error);
  }
};
const getGigs = async (req, res, next) => {
  try {
    const filter = {
      ...(req.query.cat && { cat: req.query.cat }),
      ...(req.query.userId && { userId: req.query.userId }),
      ...((req.query.min || req.query.max) && {
        price: {
          ...(req.query.min && { $gt: req.query.min }),
          ...(req.query.max && { $lt: req.query.max }),
        },
      }),
      ...(req.query.search && {
        title: { $regex: req.query.search, $options: "i" },
      }),
    };
    const gigs = await Gig.find(filter).sort({ [req.query.sort]: -1 });
    return res.status(200).json(gigs);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGig,
  deleteGig,
  getGig,
  getGigs,
};
