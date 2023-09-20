const newspaperController = require("../controllers/newspaperController");

const router = require("express").Router();
const cron = require("node-cron");

// Schedule storeArticleCountByMonth() to run at 1:20 AM daily
cron.schedule("20 1 * * *", () => {
    newspaperController.storeArticleCountByMonth();
  });

  // add newspaper to database
router.post("/addNewspaper", newspaperController.addNewspaper);
// get all newspapers from the newspaper
router.get("/getAllNewspapers", newspaperController.getAllNewspapers);
// api to store the number of articles and type for all newspapers
router.get("/storeArticleCountByMonth", newspaperController.storeArticleCountByMonth);
// api to get all the data about a newspaper given in body
router.post("/getAllDataForNewspaper", newspaperController.getAllDataForNewspaper)

module.exports = router;