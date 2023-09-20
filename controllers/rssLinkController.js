const db = require("../models");

// create main Model
const RSSLink = db.rssLinks;

// main work

// 1. create link
const addLink = async (req, res) => {
  // console.log("add Link");

  try {
    // Extract data from the request body
    const { country, type, link } = req.body;

    // Create a new record using the model's create method
    const newCountry = await RSSLink.create({
      country,
      type,
      link,
    });

    // console.log("New country record created:", newCountry.get());

    res.status(201).send(newCountry);
  } catch (error) {
    console.error("Error creating country:", error);
    res.status(500).send("Internal Server Error");
  }
};

// 2. get all links
const getAllrssLinks = async (req, res) => {
  try {
    // console.log("All links from rssLinks");

    const rssLinks = await RSSLink.findAll({});
    res.status(200).send(rssLinks);
  } catch (err) {
    console.error("Error retrieving links:", err);
    res.status(500).send("Internal Server Error");
  }
};

const getOnerssLink = async (req, res) => {
  // let id = req.params.id
  country = req.body.country;
  // console.log("One link from rssLinks");
  let rsslink = await RSSLink.findAll({ where: { country: country } });
  // console.log(rsslink);
  res.status(200).send(rsslink);
};

const deleterssLink = async (req, res) => {
  let id = req.params.id;

  await RSSLink.destroy({
    where: { country: req.body.country, type: req.body.type },
  });

  res.status(200).send("Link is deleted !");
};

const deleterssAllLink = async (req, res) => {
  try {
    await RSSLink.destroy({
      where: {}, // Empty object means no specific conditions, so it will delete all entries
    });

    res.status(200).send("All links are deleted !");
  } catch (error) {
    console.error("Error deleting links:", error);
    res.status(500).send("An error occurred while deleting links.");
  }
};

module.exports = {
  addLink,
  getAllrssLinks,
  getOnerssLink,
  deleterssLink,
  deleterssAllLink,
};
