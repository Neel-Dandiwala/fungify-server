const {
  postNftData,
  updateNftData,
  getOneNftData,
} = require("../controller/nft.controller");
const { verifyuser } = require("../middleware/auth.middleware");

router.post("/nft_data", postNftData);
router.get("/one_nft/:id", getOneNftData);
router.post("/update_nft_data/:id", updateNftData);

module.exports = router;
