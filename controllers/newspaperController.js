const db = require("../models");

const CountryCount = db.countries;
const Article = db.articles;
const RSSLink = db.rssLinks;
const NewsPaper = db.newspaper;

const addNewspaper = async (req, res) => {
  try {
    const {
      newspaper_name,
      link,
      country,
      monthly_readers,
      political_inclination,
      basic_info,
      logo,
      articles,
    } = req.body;

    // Create a CountryCount record
    const newNewspaper = await NewsPaper.create({
      newspaper_name: newspaper_name,
      link: link,
      country: country,
      monthly_readers: monthly_readers,
      political_inclination: political_inclination,
      basic_info: basic_info,
      logo: logo,
      articles: articles,
    });
    res.status(201).json(newNewspaper);
  } catch (error) {
    console.error("Error creating NewsPaper:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all articles from all countries for given months
const getArticlesForMonths = async (req, res) => {
  try {
    const months = parseInt(req.body.months);

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const articles = await Article.findAll({
      where: {
        pubDate: {
          [Op.gte]: startDate,
        },
      },
      order: [["pubDate", "DESC"]],
    });

    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching articles." });
  }
};


//  function to return all the data from newspaper table
const getAllNewspapers = async (req, res) => {
  try {
    // Use the findAll method to retrieve all records
    const newspapers = await NewsPaper.findAll();
    res.status(200).send(newspapers);
  } catch (error) {
    console.error("Error fetching NewsPapers Data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// function to store all newspaper names
const getAllNewspaperName = async (req, res) => {
  try {
    const newspapers = await NewsPaper.findAll({
      attributes: ["newspaper_name"],
    });
    return newspapers;
  } catch (error) {
    console.error("Error fetching NewsPapers Data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Implement a function to count articles by month for a specific newspaper
async function countArticlesByMonth(newspaperName) {
  // You should implement the logic to count articles by month for the given newspaper here.
  // This will depend on your data structure and how you store article information.
  // You may need to make additional database queries or data processing.

  // For demonstration purposes, let's assume you have an array of articles
  // with a "publication_date" field, and you want to count articles by month.
  const articles = await Article.findAll({
    where: {
      author: newspaperName,
    },
  });

  const articleCounts = {};

  for (const article of articles) {
    const publicationDate = new Date(article.pubDate);
    const month = publicationDate.toLocaleString("en-US", { month: "long" }); // Get month name

    if (!articleCounts[month]) {
      articleCounts[month] = 0;
    }

    articleCounts[month]++;
  }

  return articleCounts;
}

const storeArticleCountByMonth = async (req, res) => {
  try {
    const newspaperNames = await getAllNewspaperName();

    // Create an object to store the counts by month and type
    const articleCountsByMonthType = {};

    // Loop through each newspaper object and count articles
    for (const newspaper of newspaperNames) {
      // Assuming newspaperNames is an array
      const newspaperName = newspaper.newspaper_name; // Extract the newspaper_name

      // Count articles by month and type for the current newspaper
      const articleCounts = await countArticlesByMonthAndType(newspaperName); // Implement this function

      // Store the counts in the articleCountsByMonthType object
      articleCountsByMonthType[newspaperName] = articleCounts;
    }

    // Send the result as a JSON response
    res.status(200).json(articleCountsByMonthType);
  } catch (error) {
    // Handle errors here
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Implement a function to count articles by month and type for a specific newspaper
async function countArticlesByMonthAndType(newspaperName) {
  // You should implement the logic to count articles by month and type for the given newspaper here.
  // This will involve fetching the article type from the Article table.
  // You may need to make additional database queries or data processing.

  // For demonstration purposes, let's assume you have an array of articles
  // with a "publication_date" field and a "type" field.
  const articles = await Article.findAll({
    where: {
      author: newspaperName,
    },
    attributes: ["pubDate", "type"],
  });

  const articleCounts = {};

  for (const article of articles) {
    const publicationDate = new Date(article.pubDate);
    const month = publicationDate.toLocaleString("en-US", { month: "long" }); // Get month name

    if (!articleCounts[month]) {
      articleCounts[month] = {
        Neutral: 0,
        Positive: 0,
        Negative: 0,
        All:0,
      };
    }

    const articleType = article.type; // Assuming there's a "type" field in the Article table

    // Increment the type count for the current month
    if (!articleCounts[month][articleType]) {
      articleCounts[month][articleType] = 1;
    } else {
      articleCounts[month][articleType]++;
    }
  }

  // Update the newspaper table with the counts for each month
  await updateNewspaperTable(newspaperName, articleCounts);
  // console.log('Updated newspaper table');

  return articleCounts;
}

// Implement a function to update the newspaper table with the counts
// Implement a function to update the newspaper table with the counts
async function updateNewspaperTable(newspaperName, articleCounts) {
  try {
    // console.log("updating newspaper table");
    // Fetch the existing data for the newspaper from the database
    const existingNewspaperData = await NewsPaper.findOne({
      where: {
        newspaper_name: newspaperName,
      },
    });

    // If the newspaper doesn't exist in the table, create a new entry
    if (!existingNewspaperData) {
      await NewsPaper.create({
        newspaper_name: newspaperName,
        articles: articleCounts,
      });
    } else {
      // Update the existing data with the new article counts
      const updatedArticleCounts = {
        ...existingNewspaperData.articles,
        ...articleCounts,
      };

      await NewsPaper.update(
        {
          articles: updatedArticleCounts,
        },
        {
          where: {
            newspaper_name: newspaperName,
          },
        }
      );
    }
  } catch (error) {
    // Handle errors here
    console.error("Error updating newspaper table:", error);
  }
}

// Async route handler function to get all data for a given newspaper
const getAllDataForNewspaper = async (req, res) => {
  try {
    const newspaperName = req.body.newspaperName; // Access the newspaperName property from the request body

    // Find the newspaper by name and retrieve all data associated with it
    const newspaperData = await NewsPaper.findOne({
      where: {
        newspaper_name: newspaperName,
      },
    });

    if (!newspaperData) {
      // Handle the case where the newspaper does not exist
      return res.status(404).json({ error: "Newspaper not found" });
    }

    // Return the retrieved newspaper data
    res.status(200).json(newspaperData);
  } catch (error) {
    // Handle errors here
    console.error("Error fetching newspaper data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addNewspaper,
  getAllNewspapers,
  storeArticleCountByMonth,
  getAllDataForNewspaper,
};
