const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name value"],
      maxlength: [100, "Nmae must not exceed 100 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide price value"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide description value"],
      maxlength: [1500, "Nmae must not exceed 1500 characters"],
      trim: true,
    },
    image: {
      type: String,

      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide category value"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please provide company value"],
      enum: {
        values: ["marcos", "ikea", "liddy"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: true,
      default: ["#222"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 3,
    },
    avarageRating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);
productSchema.pre("remove", async function (next) {
  await this.model("review").deleteMany({ product: this._id });
  next();
});

module.exports = mongoose.model("product", productSchema);
