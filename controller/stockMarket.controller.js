// const { placeBuyOrderForNFTShare, placeSellOrderForNFTShare, getCurrentPriceOfNFTShare } = require('../services/stockMarket.service')

// const stockMarketService = require("../services/stockMarket");

const stockMarketService = new StockMarketService();

function placeBuyOrderForNFTShare(req, res) {
    const { nftId, shares, price } = req.body;
    const { userId } = req.user;
    if (!nftId || !shares || !price) {
        return res.status(400).json({
            error: "Invalid Data",
        });
    }
    stockMarketService.placeBuyOrderForNFTShare(nftId, shares, price, userId, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        return res.status(200).json({
            message: "Buy Order Placed Successfully",
            success: true,
            data: data,
        });
    });
}

function placeSellOrderForNFTShare(req, res) {
    const { nftId, shares, price } = req.body;
    const { userId } = req.user;
    if (!nftId || !shares || !price) {
        return res.status(400).json({
            error: "Invalid Data",
        });
    }
    stockMarketService.placeSellOrderForNFTShare(nftId, shares, price, userId, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        return res.status(200).json({
            message: "Sell Order Placed Successfully",
            success: true,
            data: data,
        });
    });
}

function getCurrentPriceOfNFTShare(req, res) {
    const { nftId } = req.body;
    if (!nftId) {
        return res.status(400).json({
            error: "Invalid Data",
        });
    }
    stockMarketService.getCurrentPriceOfNFTShare(nftId, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        return res.status(200).json({
            message: "Current Price of NFT Share",
            success: true,
            data: data,
        });
    });
}


export default { placeBuyOrderForNFTShare, placeSellOrderForNFTShare, getCurrentPriceOfNFTShare }