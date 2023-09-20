module.exports = (sequelize, Sequelize) => {
  const Newspaper = sequelize.define(
    "newspaper",
    {
      newspaper_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      newspaper_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      monthly_readers: {
        type: Sequelize.INTEGER,
      },
      political_inclination: {
        type: Sequelize.STRING(255),
      },
      basic_info: {
        type: Sequelize.TEXT,
      },
      logo: {
        type: Sequelize.TEXT,
      },
      articles: {
        type: Sequelize.JSON, // Change the data type to JSON
        defaultValue: {
          all: 0,
          positive: 0,
          negative: 0,
          neutral: 0,
        },
    },
    },
    {
      timestamps: false, // Disable createdAt and updatedAt columns
    }
  );
  return Newspaper;
};
