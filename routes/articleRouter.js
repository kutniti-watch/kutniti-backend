// import controllers review, products
const articleController = require("../controllers/articleController");

const cron = require("node-cron");

const router = require("express").Router();

// Schedule fetchDataDailyArticle() to run at 1 AM daily
cron.schedule("0 1 * * *", () => {
  articleController.fetchDataDailyArticle();
});

// route to add article to database
router.post("/addArticle", articleController.addArticle);
// route to get all articles available in database
router.get("/getArticle", articleController.getAllArticles);
// route to store all articles in database from RSS feed link
router.get("/storeArticles", articleController.fetchDataAndStoreInArticle);
// route to get country id using country name and type
router.get("/getCountry", articleController.getCountryId);
// route to get fetch articles from RSS feed daily
router.get("/getArticleDaily", articleController.fetchDataDailyArticle);
//  route to delete all articles
router.post("/deleteAllArticles", articleController.deleteAllarticles);
// GET all articles for a given month
router.post("/getArticlesForMonths", articleController.getArticlesForMonths);
// Get all articles data for a given newspaper
router.post("/getAllArticlesByNewspaper", articleController.getAllArticlesByNewspaper);
module.exports = router;
