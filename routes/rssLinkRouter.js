// import controllers review, products
const rssController = require("../controllers/rssLinkController");

// router
const router = require("express").Router();

// use routers

router.get("/allRssLinks", rssController.getAllrssLinks);
router.post("/oneLink", rssController.getOnerssLink);
router.post("/addLink", rssController.addLink);
router.post("/deleteLink", rssController.deleterssLink);
router.post("/deleteAllLink", rssController.deleterssAllLink);

module.exports = router;
