

const Web3 = require("web3");
const fs = require("fs");
// const connectDB = require("./configs/mongodb_config");

// let _web3;
// exports.web3 = {
//     connectToServer: async function (callback) {
//         const db = await (connectDB()).connection.db;
//         const collection = db.collection('config');
//         _web3 = await collection.findOne({
//             _id: "web3"
//         });
//         return _web3.web3_link;
//     },
//     getWeb3: function () {
//         return new Web3(new Web3.providers.HttpProvider(_web3.web3_link));
//     }
// };

exports.web3 = () => {
    return new Web3(
    new Web3.providers.HttpProvider('https://985e-42-106-240-177.ngrok.io'));
}

exports.DivisibleNftsABI = JSON.parse(fs.readFileSync('blockchain/build/contracts/DivisibleNFTs.json', 'utf-8'));
//# sourceMappingURL=web3.js.map
