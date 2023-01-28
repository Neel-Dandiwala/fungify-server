const stockMarketService = {
    placeBuyOrderForNFTShare: () => placeBuyOrderForNFTShare(nftId, shares, price, userId, callback),
    placeSellOrderForNFTShare: () => placeSellOrderForNFTShare(nftId, shares, price, userId, callback),
    getCurrentPriceOfNFTShare: () => getCurrentPriceOfNFTShare(nftId, callback),
};


function placeBuyOrderForNFTShare(nftId, shares, price, userId, callback) {
    console.log("placeBuyOrderForNFTShare");
    if (!nftId || !shares || !price || !userId) {
        return callback("Invalid or incomplete Data");
    }

    // TODO: Check if the user has enough balance to buy the shares
    // let userBalance = await checkUserBalance(userId, price);
    // if (userBalance < price) {           // ---> assuming that this condition is false
    //     return callback("Insufficient Balance");
    // }

    


    callback(null, { nftId, shares, price, userId });
}