const { web3, DivisibleNftsABI } = require("../web3");

const _transferACoin = async (req, res) => {
  const _sender = req.body.sender;
  const _receiver = req.body.receiver;
  const _numACoins = req.body.numACoins;
  const _caller = req.body.caller;
  let logs;

  try {
    const divisibleNftsContract = new (web3()).eth.Contract(
      DivisibleNftsABI.abi,
      process.env.DIVISIBLE_NFTS_ADDRESS,
      {}
    );
    var encodedData = divisibleNftsContract.methods
      .transferACoin(_sender, _receiver, _numACoins, _caller)
      .encodeABI();
    const transactionParam = {
      to: process.env.DIVISIBLE_NFTS_ADDRESS,
      // gas: '0x76c0', // 30400
      // gasPrice: '0x9184e72a000', // 10000000000000
      // value: encodedValue,
      data: encodedData,
    };

    res.status(200).json(transactionParam);
    return;
  } catch (err) {
    console.log(err);
    logs = {
      field: "Blockchain Error",
      message: err,
    };
    res.status(400).json(logs);
    return { logs };
  }
};

const _transferACoinEvent = async (req, res) => {
  const _caller = req.body.caller;
  const divisibleNftsContract = new (web3()).eth.Contract(
    DivisibleNftsABI.abi,
    process.env.DIVISIBLE_NFTS_ADDRESS,
    {}
  );
  var blockNumber = await web3().eth.getBlockNumber();
  await divisibleNftsContract
    .getPastEvents("transferACoinEvent", {
      fromBlock: blockNumber - 5,
      toBlock: "latest",
    })
    .then(function (blockchain_result: any) {
      for (let i = 0; i < blockchain_result.length; i++) {
        let resultCaller = blockchain_result[i]["returnValues"]["_caller"]
          .toString()
          .replace(/\s/g, "");
        var boolCheck =
          resultCaller.toString().trim().toLowerCase() ===
          _caller.toString().trim().toLowerCase();
        if (boolCheck) {
          console.log(blockchain_result[i]);
          res.status(200).json(blockchain_result[i]);
          return;
        }
      }
      res.status(400).json("No event emitted");
      return;
    });
};

const _buyACoin = async (req, res) => {
  const _account = req.body.account;
  const _numACoins = req.body.numACoins;
  const _caller = req.body.caller;
  // const _amount = (web3()).utils.toWei(_numACoins, "ether");

  let logs;
  try {
    const divisibleNftsContract = new (web3()).eth.Contract(
      DivisibleNftsABI.abi,
      process.env.DIVISIBLE_NFTS_ADDRESS,
      {}
    );
    var encodedData = divisibleNftsContract.methods
      .buyACoin(_account, _numACoins, _caller)
      .encodeABI();
    var encodedValue = web3().utils.toHex(
      web3().utils.toWei(_numACoins, "ether")
    );
    const transactionParam = {
      to: process.env.DIVISIBLE_NFTS_ADDRESS,
      // gas: '0x76c0', // 30400
      // gasPrice: '0x9184e72a000', // 10000000000000
      value: encodedValue,
      data: encodedData,
    };

    res.status(200).json(transactionParam);
    return;
  } catch (err) {
    console.log(err);
    logs = {
      field: "Blockchain Error",
      message: err,
    };
    res.status(400).json(logs);
    return { logs };
  }
};

const _buyACoinEvent = async (req, res) => {
  const _caller = req.body.caller;
  const divisibleNftsContract = new (web3()).eth.Contract(
    DivisibleNftsABI.abi,
    process.env.DIVISIBLE_NFTS_ADDRESS,
    {}
  );
  var blockNumber = await web3().eth.getBlockNumber();
  await divisibleNftsContract
    .getPastEvents("buyACoinEvent", {
      fromBlock: blockNumber - 5,
      toBlock: "latest",
    })
    .then(function (blockchain_result: any) {
      for (let i = 0; i < blockchain_result.length; i++) {
        let resultCaller = blockchain_result[i]["returnValues"]["_caller"]
          .toString()
          .replace(/\s/g, "");
        var boolCheck =
          resultCaller.toString().trim().toLowerCase() ===
          _caller.toString().trim().toLowerCase();
        if (boolCheck) {
          console.log(blockchain_result[i]);
          res.status(200).json(blockchain_result[i]);
          return;
        }
      }
      res.status(400).json("No event emitted");
      return;
    });
};

const _burnACoin = async (req, res) => {
  const _account = req.body.account;
  const _numACoins = req.body.numACoins;
  const _caller = req.body.caller;
  // const _amount = web3().utils.toWei(_numACoins, "ether");

  let logs;

  try {
    const divisibleNftsContract = new (web3()).eth.Contract(
      DivisibleNftsABI.abi,
      process.env.DIVISIBLE_NFTS_ADDRESS,
      {}
    );
    var encodedData = divisibleNftsContract.methods
      .burnACoin(_account, _numACoins, _caller)
      .encodeABI();
    var encodedValue = web3().utils.toHex(
      web3().utils.toWei(_numACoins, "ether")
    );
    const transactionParam = {
      to: process.env.DIVISIBLE_NFTS_ADDRESS,
      // gas: '0x76c0', // 30400
      // gasPrice: '0x9184e72a000', // 10000000000000
      value: encodedValue,
      data: encodedData,
    };

    await web3
      .getWeb3()
      .eth.accounts.signTransaction(
        transactionParam,
        process.env.OWNER_PRIVATE_KEY
      )
      .then((signed) => {
        web3()
          .eth.sendSignedTransaction(signed.rawTransaction)
          .then(function (blockchain_result: any, events: any) {
            console.log(blockchain_result);
            logs = {
              blockchain_result,
            };
          });
      })
      .catch((err: any) => {
        console.log(err);
        logs = {
          field: "Blockchain Error",
          message: err,
        };

        res.status(400).json(logs);
        return { logs };
      });

    await divisibleNftsContract
      .getPastEvents("burnACoinEvent", {
        fromBlock: blockNumber - 5,
        toBlock: "latest",
      })
      .then(function (blockchain_result: any) {
        for (let i = 0; i < blockchain_result.length; i++) {
          let resultCaller = blockchain_result[i]["returnValues"]["_caller"]
            .toString()
            .replace(/\s/g, "");
          var boolCheck =
            resultCaller.toString().trim().toLowerCase() ===
            _caller.toString().trim().toLowerCase();
          if (boolCheck) {
            console.log(blockchain_result[i]);
            res.status(200).json(blockchain_result[i]);
            return;
          }
        }
        res.status(400).json("No event emitted");
        return;
      });
  } catch (err) {
    console.log(err);
    logs = {
      field: "Blockchain Unknown Error",
      message: err,
    };
    res.status(400).json(logs);
    return { logs };
  }
};

const _getAcoinTotalSupply = async (req, res) => {

  const _caller = req.body.caller;
  let logs;

  try {
    const divisibleNftsContract = new (web3()).eth.Contract(
      DivisibleNftsABI.abi,
      process.env.DIVISIBLE_NFTS_ADDRESS,
      {}
    );
    var encodedData = divisibleNftsContract.methods
      .getAcoinTotalSupply(_caller)
      .encodeABI();
    
    const transactionParam = {
      to: process.env.DIVISIBLE_NFTS_ADDRESS,
      // gas: '0x76c0', // 30400
      // gasPrice: '0x9184e72a000', // 10000000000000
      // value: encodedValue,
      data: encodedData,
    };

    await web3
      .getWeb3()
      .eth.accounts.signTransaction(
        transactionParam,
        process.env.OWNER_PRIVATE_KEY
      )
      .then((signed) => {
        web3()
          .eth.sendSignedTransaction(signed.rawTransaction)
          .then(function (blockchain_result: any, events: any) {
            console.log(blockchain_result);
            logs = {
              blockchain_result,
            };
          });
      })
      .catch((err: any) => {
        console.log(err);
        logs = {
          field: "Blockchain Error",
          message: err,
        };

        res.status(400).json(logs);
        return { logs };
      });

    await divisibleNftsContract
      .getPastEvents("getAcoinTotalSupplyEvent", {
        fromBlock: blockNumber - 5,
        toBlock: "latest",
      })
      .then(function (blockchain_result: any) {
        for (let i = 0; i < blockchain_result.length; i++) {
          let resultCaller = blockchain_result[i]["returnValues"]["_caller"]
            .toString()
            .replace(/\s/g, "");
          var boolCheck =
            resultCaller.toString().trim().toLowerCase() ===
            _caller.toString().trim().toLowerCase();
          if (boolCheck) {
            console.log(blockchain_result[i]);
            res.status(200).json(blockchain_result[i]);
            return;
          }
        }
        res.status(400).json("No event emitted");
        return;
      });
  } catch (err) {
    console.log(err);
    logs = {
      field: "Blockchain Unknown Error",
      message: err,
    };
    res.status(400).json(logs);
    return { logs };
  }

};

const _acoinBalanceOf = async (req, res) => {
  const _account = req.body.account;
  const _caller = req.body.caller;
  let logs;

  try {
    const divisibleNftsContract = new (web3()).eth.Contract(
      DivisibleNftsABI.abi,
      process.env.DIVISIBLE_NFTS_ADDRESS,
      {}
    );
    var encodedData = divisibleNftsContract.methods
      .acoinBalanceOf(_account, _caller)
      .encodeABI();
    
    const transactionParam = {
      to: process.env.DIVISIBLE_NFTS_ADDRESS,
      // gas: '0x76c0', // 30400
      // gasPrice: '0x9184e72a000', // 10000000000000
      // value: encodedValue,
      data: encodedData,
    };

    await web3
      .getWeb3()
      .eth.accounts.signTransaction(
        transactionParam,
        process.env.OWNER_PRIVATE_KEY
      )
      .then((signed) => {
        web3()
          .eth.sendSignedTransaction(signed.rawTransaction)
          .then(function (blockchain_result: any, events: any) {
            console.log(blockchain_result);
            logs = {
              blockchain_result,
            };
          });
      })
      .catch((err: any) => {
        console.log(err);
        logs = {
          field: "Blockchain Error",
          message: err,
        };

        res.status(400).json(logs);
        return { logs };
      });

    await divisibleNftsContract
      .getPastEvents("acoinBalanceOfEvent", {
        fromBlock: blockNumber - 5,
        toBlock: "latest",
      })
      .then(function (blockchain_result: any) {
        for (let i = 0; i < blockchain_result.length; i++) {
          let resultCaller = blockchain_result[i]["returnValues"]["_caller"]
            .toString()
            .replace(/\s/g, "");
          var boolCheck =
            resultCaller.toString().trim().toLowerCase() ===
            _caller.toString().trim().toLowerCase();
          if (boolCheck) {
            console.log(blockchain_result[i]);
            res.status(200).json(blockchain_result[i]);
            return;
          }
        }
        res.status(400).json("No event emitted");
        return;
      });
  } catch (err) {
    console.log(err);
    logs = {
      field: "Blockchain Unknown Error",
      message: err,
    };
    res.status(400).json(logs);
    return { logs };
  }

};

module.exports = {
  _buyACoin,
  _burnACoin,
  _transferACoin,
  _getAcoinTotalSupply,
  _acoinBalanceOf,
};
//# sourceMappingURL=ACoinController.js.map
