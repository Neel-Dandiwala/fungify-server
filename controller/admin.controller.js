const nftModel = require("../model/nft.model");

exports.approveNft = async (req, res) => {
  const approved = req.body.approved;
  const { id } = req.params;
  nftModel
    .findByIdAndUpdate(
      { id },
      {
        ...{
          approved,
        },
      },
      { new: true }
    )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Error occured",
        });
      }
      return res.status(200).json({
        message: "NFT data! added successfully",
        success: true,
        nft: data,
      });
    });
};
