"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { _buyACoin, _burnACoin, _transferACoin, _getAcoinTotalSupply, _acoinBalanceOf } = require('../controllers/ACoinController');
const router = express_1.default.Router();
router.post('/acoin/buy', _buyACoin);
router.post('/acoin/burn', _burnACoin);
router.post('/acoin/transfer', _transferACoin);
router.get('/acoin/totalSupply', _getAcoinTotalSupply);
router.post('/acoin/balanceOf', _acoinBalanceOf);
module.exports = router;
//# sourceMappingURL=ACoinRoutes.js.map