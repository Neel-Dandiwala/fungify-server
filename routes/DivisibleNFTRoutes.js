"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { _mint, _transferToken, _unitsOwnedOfAToken, _divisibilityOfAToken, _totalSupplyView } = require('../controllers/DivisibleNFTController');
const router = express_1.default.Router();
router.get('/nft/totalSupply', _totalSupplyView);
router.post('/nft/mint', _mint);
router.post('/nft/transfer', _transferToken);
router.post('/nft/owner/own', _unitsOwnedOfAToken);
router.post('/nft/divisibility', _divisibilityOfAToken);
module.exports = router;
//# sourceMappingURL=DivisibleNFTRoutes.js.map