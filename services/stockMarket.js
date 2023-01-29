const { dynamicBuyOrderModel, dynamicSellOrderModel, dynamicConfirmedOrderModel } = require("../model/stock.model");
const { web3 } = require('../web3')

async function transferTokensWithId(_from, _to, _tokenId, _units) {

    let result = null;

    const divisibleNftsContract = new (web3()).eth.Contract(DivisibleNftsABI.abi, process.env.DIVISIBLE_NFTS_ADDRESS, {});
    await divisibleNftsContract.methods.transferToken(_from, _to, _tokenId, _units).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
        .then(function (blockchain_result) {
            console.log(blockchain_result);
            logs = {
                from: blockchain_result.events.transferEvent.returnValues._from,
                to: blockchain_result.events.transferEvent.returnValues._to,
                tokenId: blockchain_result.events.transferEvent.returnValues._tokenId,
                units: blockchain_result.events.transferEvent.returnValues._units,
                message: blockchain_result.events.transferEvent.returnValues._message,
            };
            result = logs;
            return;
        }).catch((err) => {
            console.log(err);
            logs = {
                field: "Blockchain Error",
                message: err,
            };
            result = logs;
            return;
        });

    return result;
}

async function checkAndExecuteBuyOrderIfAnySellOrderExists(nftId, shares, price, userAddress) {
    // Check if there is any sell order for the given NFT
    var findSellOrder = await dynamicSellOrderModel(nftId).findOne({ price: price, quantity: shares, userId: userAddress });
    console.log(doc);
    let sellerId = null;
    if (findSellOrder !== null && findSellOrder !== undefined) {
        if (findSellOrder.length > 0) {
            sellerId = findSellOrder.userId;
        }
    }

    if (sellerId !== null) {
        // If yes, then execute the buy order
        var executeOrder = async () => {
            await dynamicBuyOrderModel(nftId).deleteOne({ price: price, quantity: shares, userId: userAddress });
            await dynamicSellOrderModel(nftId).deleteOne({ price: price, quantity: shares, userId: userAddress });
            await dynamicConfirmedOrderModel(nftId).create({ price: price, quantity: shares, userId: userAddress });
            // Call blockchain code to transfer the shares to the user's wallet
            await transferTokensWithId(sellerId, userAddress, nftId, shares);
        }
        executeOrder();
    }

    // If no, then place the buy order


}

module.exports = { checkAndExecuteBuyOrderIfAnySellOrderExists }