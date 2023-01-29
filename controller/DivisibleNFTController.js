
const { web3,  DivisibleNftsABI} = require('../web3')

const _mint = async (req, res) => {
    const _owner = req.body.owner;
    const _tokenId = req.body.tokenId;
    const _noOfShares = req.body.noOfShares;
    let logs;
    const divisibleNftsContract =  new (web3()).eth.Contract(DivisibleNftsABI.abi, process.env.DIVISIBLE_NFTS_ADDRESS, {});
    await divisibleNftsContract.methods.mint(_owner, _tokenId, _noOfShares).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
        .then(function (blockchain_result) {
        console.log(blockchain_result);
        logs = {
            owner: blockchain_result.events.mintEvent.returnValues._owner,
            tokenId: blockchain_result.events.mintEvent.returnValues._tokenId,
            noOfShares: blockchain_result.events.mintEvent.returnValues._noOfShares,
            tokenTotalSupply: blockchain_result.events.mintEvent.returnValues._tokenTotalSupply,
            message: blockchain_result.events.mintEvent.returnValues._message,
        };
        res.status(200).json(logs);
        return;
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
};

const _transferToken = async (req, res) => {
    const _from = req.body.from;
    const _to = req.body.to;
    const _tokenId = req.body.tokenId;
    const _units = req.body.units;
    let logs;
    const divisibleNftsContract =  new (web3()).eth.Contract(DivisibleNftsABI.abi, process.env.DIVISIBLE_NFTS_ADDRESS, {});
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
        res.status(200).json(logs);
        return;
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
};
const _unitsOwnedOfAToken = async (req, res) => {
    const _owner = req.body.owner;
    const _tokenId = req.body.tokenId;
    let logs;
    const divisibleNftsContract =  new (web3()).eth.Contract(DivisibleNftsABI.abi, process.env.DIVISIBLE_NFTS_ADDRESS, {});
    await divisibleNftsContract.methods.unitsOwnedOfAToken(_owner, _tokenId).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
        .then(function (blockchain_result) {
        console.log(blockchain_result);
        logs = {
            balance: blockchain_result.events.unitsOwnedOfATokenEvent.returnValues._balance,
            message: blockchain_result.events.unitsOwnedOfATokenEvent.returnValues._message,
        };
        res.status(200).json(logs);
        return;
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
};
const _divisibilityOfAToken = async (req, res) => {
    const _tokenId = req.body.tokenId;
    let logs;
    const divisibleNftsContract = new (web3()).eth.Contract(DivisibleNftsABI.abi, process.env.DIVISIBLE_NFTS_ADDRESS, {});
    await divisibleNftsContract.methods.divisibilityOfAToken(_tokenId).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
        .then(function (blockchain_result) {
        console.log(blockchain_result);
        logs = {
            divisibility: blockchain_result.events.divisibilityEvent.returnValues._divisibility,
            message: blockchain_result.events.divisibilityEvent.returnValues._message,
        };
        res.status(200).json(logs);
        return;
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
};
const _totalSupplyView = async (req, res) => {
    let logs;
    const divisibleNftsContract =  new (web3()).eth.Contract(DivisibleNftsABI.abi, process.env.DIVISIBLE_NFTS_ADDRESS, {});
    await divisibleNftsContract.methods.totalSupplyView().send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
        .then(function (blockchain_result) {
        console.log(blockchain_result);
        logs = {
            totalSupply: blockchain_result.events.totalSupplyEvent.returnValues._totalSupply,
            message: blockchain_result.events.totalSupplyEvent.returnValues._message,
        };
        res.status(200).json(logs);
        return;
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
};
module.exports = {
    _mint, _transferToken, _unitsOwnedOfAToken, _divisibilityOfAToken, _totalSupplyView
};
//# sourceMappingURL=DivisibleNFTController.js.map