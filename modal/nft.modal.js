const mongoose = require("mongoose");

const Nftschema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 255,
      required: true,
    },

    organization: {
      type: String,
      index: true,
      required: true,
    },
    file: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    approve: {
      value: false,
    },
    totalshares: {
      type: Number,
    },
    user: {
      type: Map,
    },
  },
  { timestamps: true } // createdAt, updatedAt timestamps will be taken care of by this automatically
);

module.exports = mongoose.model("Nft-data", Nftschema, "nft-data");
