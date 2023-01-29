const {
  updateNftData,
  getOneNftData,
  getAllApprovedNFTS,
  getUserNFtsByWalletAddress
} = require("../controller/nft.controller");
const { web3, DivisibleNftsABI } = require('../web3')
const upload = require('./../middleware/multer.middleware');
const generateDataUri = require("../utils/dataUriParser");
const nft = require("../model/nft.model");
const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controller/cloudinary.controller");
const { _mint, _transferToken, _unitsOwnedOfAToken, _divisibilityOfAToken, _totalSupplyView } = require('../controller/DivisibleNFTController');


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
      const _owner = nftData.user.walletAddress;
      const _tokenId = nftData.tokenId;
      const _divisibility = nftData.shares;
      let logs;
      const divisibleNftsContract = new (web3()).eth.Contract(DivisibleNftsABI.abi, process.env.DIVISIBLE_NFTS_ADDRESS, {});
      await divisibleNftsContract.methods.mint(_owner, _tokenId, _divisibility).send({ from: process.env.OWNER_ADDRESS, gas: '2000000', gasPrice: '3000000' })
        .then(function (blockchain_result) {
          console.log(blockchain_result);
          logs = {
            owner: blockchain_result.events.mintEvent.returnValues._owner,
            tokenId: blockchain_result.events.mintEvent.returnValues._tokenId,
            divisible: blockchain_result.events.mintEvent.returnValues._divisible,
            totalSupply: blockchain_result.events.mintEvent.returnValues._totalSupply,
            message: blockchain_result.events.mintEvent.returnValues._message,
          };
          // res.status(200).json(logs);
          // return;
        }).catch((err) => {
          console.log(err);
          logs =
          {
            field: "Blockchain Error",
            message: err,
          };
          res.status(400).json(logs);
          return { logs };
        });

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
router.get('/apporved-nfts', getAllApprovedNFTS);
router.get('/user-nfts/:walletAddress', getUserNFtsByWalletAddress);

module.exports = router;
