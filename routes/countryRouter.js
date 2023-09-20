const countryController = require("../controllers/countryController");

const router = require("express").Router();
const cron = require("node-cron");

// Schedule storeAllCountryArticles() to run at 1:10 AM daily
cron.schedule("10 1 * * *", () => {
  countryController.storeAllCountryArticles();
});

router.post("/addCountry", countryController.addCountry);
router.get("/allcountryArticles", countryController.storeAllCountryArticles);
router.post("/deleteCountry", countryController.deleteCountry);
router.post("/getaCountryArticleNumber", countryController.getaCountryArticleNumber);
router.get("/getallCountryArticleNumber", countryController.getallCountryArticleNumber);
// router.post("/getoneCountryArticles", countryController.getoneCountryArticles);
router.post("/getoneCountryArticlesMonth", countryController.getoneCountryArticlesMonth);
router.get("/getallCountryArticlesMonth", countryController.getallCountryArticlesMonth);

module.exports = router;
