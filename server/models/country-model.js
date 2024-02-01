// Import our sequelize connection, so we can make our model
const  sequelize  = require('../config/sequelize')
const { DataTypes, Model } = require('sequelize')
const Currency = require ("./currency-model");

// Define our Currency Model
// class Country extends Model {}
const Country = sequelize.define("Country", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

)


 
// Country
// .bulkCreate([
//    { id: 1, name: 'Canada' },
//    { id: 2, name: 'USA' },
//    { id: 3, name: 'Pakistan' },
//    { id: 4, name: 'UK' },
//    { id: 5, name: 'Japan' },
//    { id: 6, name: 'Britan' },
// ])
//    .then(() => {
//      console.log('Bulk insert completed successfully.');
//    })
//    .catch((error) => {
//      console.error('Error during bulk insert:', error);
//    });

module.exports = Country;