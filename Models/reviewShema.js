const mongoose = require("mongoose");
const reviewShema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "please provide rating value"],
    },
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
reviewShema.index({ product: 1, user: 1 }, { unique: true });
reviewShema.statics.calculateAvarageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        avarageRating: {
          $avg: "$rating",
        },
        numberOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  try {
    await this.model("product").findOneAndUpdate(
      { _id: productId },
      {
        avarageRating: result[0]?.avarageRating.toFixed(2) || 0,
        numberOfReviews: result[0]?.numberOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
reviewShema.post("remove", async function () {
  await this.constructor.calculateAvarageRating(this.product);
});
reviewShema.post("save", async function () {
  await this.constructor.calculateAvarageRating(this.product);
});
module.exports = mongoose.model("review", reviewShema);
