const express = require('express')
const router = express.Router()

// Controllers
const { placeBuyOrderForNFTShare, placeSellOrderForNFTShare, getCurrentPriceOfNFTShare } = require("../controller/stockmarket.controller");
router.get('/getCurrentPrice', getCurrentPriceOfNFTShare);
router.post('/placeBuyOrder', placeBuyOrderForNFTShare);
router.post('/placeSellOrder', placeSellOrderForNFTShare);

module.exports = router;