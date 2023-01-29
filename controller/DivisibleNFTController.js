
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

const _mintTemp = async (req, res) => {
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

    const _account1 = '0x47Cc91d299487a5dED85731F7Ed6c0c9cAC86A0b'
    const _account2 = '0xA93854DB5133468a46c6A7ae57aEAeb31D22BDBE'
    const _numACoins = 20
    const _amount = (web3()).utils.toWei(_numACoins, "ether");
    await (web3()).eth.sendTransaction({ from: process.env.OWNER_ADDRESS, to: _account1, gasPrice: '3000000', value: _amount })
        .then(async function (blockchain_result) {
        await divisibleNftsContract.methods.burnACoin(_account1, _numACoins).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
            .then(function (burnACoin_result) {
            console.log(burnACoin_result);
            logs = {
                account: burnACoin_result.events.burnACoinEvent.returnValues._account,
                numACoins: burnACoin_result.events.burnACoinEvent.returnValues._numACoins,
            };
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
 
    })
    .catch((err) => {
      console.log(err);
      logs = {
        field: "Blockchain Error",
        message: err,
      };
      res.status(400).json(logs);
      return { logs };
    });

    await (web3()).eth.sendTransaction({ from: process.env.OWNER_ADDRESS, to: _account2, gasPrice: '3000000', value: _amount })
        .then(async function (blockchain_result) {
        await divisibleNftsContract.methods.burnACoin(_account2, _numACoins).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
            .then(function (burnACoin_result) {
            console.log(burnACoin_result);
            logs = {
                account: burnACoin_result.events.burnACoinEvent.returnValues._account,
                numACoins: burnACoin_result.events.burnACoinEvent.returnValues._numACoins,
            };
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
       
    })
    .catch((err) => {
      console.log(err);
      logs = {
        field: "Blockchain Error",
        message: err,
      };
      res.status(400).json(logs);
      return { logs };
    });

    const _from = _owner;
    const _to1 = _account1;
    const _units = _numACoins;

    await divisibleNftsContract.methods.transferToken(_from, _to1, _tokenId, _units).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
        .then(function (blockchain_result) {
        console.log(blockchain_result);
        logs = {
            from: blockchain_result.events.transferEvent.returnValues._from,
            to: blockchain_result.events.transferEvent.returnValues._to,
            tokenId: blockchain_result.events.transferEvent.returnValues._tokenId,
            units: blockchain_result.events.transferEvent.returnValues._units,
            message: blockchain_result.events.transferEvent.returnValues._message,
        };
      
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

    const _to2 = _account2;

    await divisibleNftsContract.methods.transferToken(_from, _to2, _tokenId, _units).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
        .then(function (blockchain_result) {
        console.log(blockchain_result);
        logs = {
            from: blockchain_result.events.transferEvent.returnValues._from,
            to: blockchain_result.events.transferEvent.returnValues._to,
            tokenId: blockchain_result.events.transferEvent.returnValues._tokenId,
            units: blockchain_result.events.transferEvent.returnValues._units,
            message: blockchain_result.events.transferEvent.returnValues._message,
        };
        
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
        field: "Done",
        message: "Minting of Token, Burning ACoin, Transfer of Share"
    });
    return;

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
    _mint, _transferToken, _unitsOwnedOfAToken, _divisibilityOfAToken, _totalSupplyView, _mintTemp
};
//# sourceMappingURL=DivisibleNFTController.js.map