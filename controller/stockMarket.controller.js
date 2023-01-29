const stockMarketService = require("../services/stockMarket");

async function placeBuyOrderForNFTShare(req, res) {
    const { nftId, shares, price, userAddress } = req.body;
    if (!nftId || !shares || !price) {
        return res.status(400).json({
            error: "Invalid Data",
        });
    }

    // TODO: Check if the user has enough balance to buy the shares
    // let userBalance = await checkUserBalance(userId, price);
    // if (userBalance < price) {           // ---> assuming that this condition is false
    //     return callback("Insufficient Balance");
    // }
    var data = await dynamicBuyOrderModel(nftId).create({
        quantity: shares, price, userAddress
    });

    var orderConfirmed = await checkAndExecuteIfAnySellOrderExists(nftId, shares, price, userAddress);

    // TODO: Deduct the user balance
    // TODO: Add the shares to the user's wallet
    // TODO: Invoke Blockchain code to transfer the shares to the user's wallet

    return res.status(200).json({
        message: "Buy Order Placed Successfully",
        success: true,
        data: data,
        orderConfirmed: orderConfirmed,
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


module.exports = { placeBuyOrderForNFTShare, placeSellOrderForNFTShare, getCurrentPriceOfNFTShare }