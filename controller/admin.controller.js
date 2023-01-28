const NftModal = require("../modal/nft.modal");

exports.approveNft = async (req, res) => {
  const { id } = req.params;
  const approved = req.body.approved;
  console.log(typeof id);
  NftModal.findByIdAndUpdate(
    { _id: id },
    {
      ...{
        /* A boolean value that is used to check if the NFT is approved or not. */
        approved: approved,
      },
    },
    { new: true }
  ).exec((err) => {
    if (err) {
      return res.status(400).json({
        error: "Error occured",
      });
    }
    res.status(200).json({
      message: "NFT data! Updated successfully",
      success: true,
    });
    return;
  });
};

exports.getnftData = async (req, res) => {
  await NftModal.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Error occured",
      });
    }
    console.log(data);
    res.status(200).json(data);
    return;
    // res.status(200);
  });
};

exports.deleteOneNftData = async (req, res) => {
  const { id } = req.params;
  NftModal.findOneAndDelete({ id }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Error occured",
      });
    }
    return res.status(200).json({
      message: "NFT data! deleted successfully",
      success: true,
    });
  });
};
