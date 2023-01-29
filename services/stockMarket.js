const { dynamicBuyOrderModel, dynamicSellOrderModel, dynamicConfirmedOrderModel } = require("../model/stock.model");

async function checkAndExecuteIfAnySellOrderExists(nftId, shares, price, userAddress) {
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
            
        }
        executeOrder();
    }


    // If no, then place the buy order


}