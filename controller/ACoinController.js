const { web3, DivisibleNftsABI } = require("../web3");

const _transferACoin = async (req, res) => {
  const _sender = req.body.sender;
  const _receiver = req.body.receiver;
  const _numACoins = req.body.numACoins;
  let logs;
  const divisibleNftsContract = new (web3().eth.Contract)(
    DivisibleNftsABI.abi,
    process.env.DIVISIBLE_NFTS_ADDRESS,
    {}
  );
  await divisibleNftsContract.methods
    .transferACoin(_sender, _receiver, _numACoins)
    .send({ from: process.env.OWNER_ADDRESS, gasPrice: "3000000" })
    .then(function (blockchain_result) {
      console.log(blockchain_result);
      logs = {
        sender: blockchain_result.events.transferACoinEvent.returnValues._from,
        receiver: blockchain_result.events.transferACoinEvent.returnValues._to,
        numACoins:
          blockchain_result.events.transferACoinEvent.returnValues._numACoins,
      };
      res.status(200).json(logs);
      return;
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
};

const _buyACoin = async (req, res) => {
    const _account = req.body.account;
    const _numACoins = req.body.numACoins;
    const _amount = (web3()).utils.toWei(_numACoins, "ether");
    console.log(_amount);
    let logs;
    const divisibleNftsContract = new (web3()).eth.Contract(DivisibleNftsABI.abi, process.env.DIVISIBLE_NFTS_ADDRESS, {});
    await (web3()).eth.sendTransaction({ from: _account, to: process.env.OWNER_ADDRESS, gasPrice: '3000000', value: _amount })
        .then(async function (blockchain_result) {
        await divisibleNftsContract.methods.buyACoin(_account, _numACoins).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
            .then(function (buyACoin_result) {
            console.log(buyACoin_result);
            logs = {
                account: buyACoin_result.events.buyACoinEvent.returnValues._account,
                numACoins: buyACoin_result.events.buyACoinEvent.returnValues._numACoins,
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
      return;
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
  return;
};

const _burnACoin = async (req, res) => {
    const _account = req.body.account;
    const _numACoins = req.body.numACoins;
    const _amount = (web3()).utils.toWei(_numACoins, "ether");
    console.log(_amount);
    let logs;
    const divisibleNftsContract = new (web3()).eth.Contract(DivisibleNftsABI.abi, process.env.DIVISIBLE_NFTS_ADDRESS, {});
    await divisibleNftsContract.methods.burnACoin(_account, _numACoins).send({ from: process.env.OWNER_ADDRESS, gasPrice: '3000000' })
        .then(async function ( burnACoin_result) {
        await (web3()).eth.sendTransaction({ from: process.env.OWNER_ADDRESS, to: _account, gasPrice: '3000000', value: _amount })
            .then(function (blockchain_result) {
            console.log(blockchain_result);
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
      return;
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
  return;
};
const _getAcoinTotalSupply = async (req, res) => {
  let logs;
  const divisibleNftsContract = new (web3().eth.Contract)(
    DivisibleNftsABI.abi,
    process.env.DIVISIBLE_NFTS_ADDRESS,
    {}
  );
  await divisibleNftsContract.methods
    .getAcoinTotalSupply()
    .send({ from: process.env.OWNER_ADDRESS, gasPrice: "3000000" })
    .then(function (blockchain_result) {
      console.log(blockchain_result);
      logs = {
        acoinTotalSupply:
          blockchain_result.events.getAcoinTotalSupplyEvent.returnValues
            ._acoinTotalSupply,
        message:
          blockchain_result.events.getAcoinTotalSupplyEvent.returnValues
            ._message,
      };
      res.status(200).json(logs);
      return;
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
};

const _acoinBalanceOf = async (req, res) => {
  const _account = req.body.account;
  let logs;
  const divisibleNftsContract = new (web3().eth.Contract)(
    DivisibleNftsABI.abi,
    process.env.DIVISIBLE_NFTS_ADDRESS,
    {}
  );
  await divisibleNftsContract.methods
    .acoinBalanceOf(_account)
    .send({ from: process.env.OWNER_ADDRESS, gasPrice: "3000000" })
    .then(function (blockchain_result) {
      console.log(blockchain_result);
      logs = {
        acoinBalance:
          blockchain_result.events.acoinBalanceOfEvent.returnValues
            ._acoinBalance,
        message:
          blockchain_result.events.acoinBalanceOfEvent.returnValues._message,
      };
      res.status(200).json(logs);
      return;
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
};

module.exports = {
  _buyACoin,
  _burnACoin,
  _transferACoin,
  _getAcoinTotalSupply,
  _acoinBalanceOf,
};
//# sourceMappingURL=ACoinController.js.map
