module.exports = (sequelize, Sequelize) => {
  const RssLink = sequelize.define(
    "rssLinks",
    {
      country_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [1, 255], // Example: limit country to between 1 and 255 characters
        },
      },
      type: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUrl: true, // Example: validate that 'link' is a URL
        },
      },
    },
    { timestamps: false }
  );

  return RssLink;
};
