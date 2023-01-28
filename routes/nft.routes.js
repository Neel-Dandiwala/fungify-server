const {
  updateNftData,
  getOneNftData,
} = require("../controller/nft.controller");
const upload = require('./../middleware/multer.middleware');
const generateDataUri = require("../utils/dataUriParser");
const nft = require("../model/nft.model");
const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controller/cloudinary.controller");


router.post("/add-nft",
  upload.single("image"),
  async (req, res) => {
    try {
      // Generate the data uri from the file buffer data 
      const dataUri = generateDataUri(req.file);

      // // Save the profile image file to the database
      const { secure_url, public_id } = await uploadImage(dataUri.content);
      console.log(secure_url);

      const { name, organization, price, shares, user } = req.body;
      console.log(req.body);
      const nftData = new nft({
        name,
        organization,
        tokenId: public_id,
        image: secure_url,
        price: parseInt(price),
        shares: parseInt(shares),
        user,
      });
      await nftData.save();
      res.status(200).json({
        success: true,
        message: "NFT data! added successfully",
        nft: nftData,
      });

    }
    catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  }
);
router.get("/one_nft/:id", getOneNftData);
router.post("/update_nft_data/:id", updateNftData);

module.exports = router;
