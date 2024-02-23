// Import our sequelize connection, so we can make our model
const  sequelize  = require("../config/sequelize");
const { DataTypes, Model } = require("sequelize");
// const Country = require ("./country-model");

// Define our Currency Model

const testCurrency = sequelize.define("testCurrency", {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    // countryId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {  // Defining countryId as Foreign Key    
    //     model: Country,
    //     key: "id",
    //   },
    // },
    conversionRate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },

);



// Association between Currency and Country
// Currency.belongsTo(Country, {
//     foreignKey: "countryId",
//     onDELETE:'CASCADE'
//   });


module.exports = testCurrency;
