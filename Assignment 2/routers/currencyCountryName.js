

const currencyCountryNameRouter = require('express').Router();
const Currency = require('../models/currency-model');
const Country = require('../models/country-model');


/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currencyCountryName/
 * @responds with returning the data as a JSON
 */
currencyCountryNameRouter.get('/', async(request, response) => {
  console.log('received GET request')
  Currency.belongsTo(Country, { foreignKey: 'countryId' });
  result=await Currency.findAll({
    attributes :['currencyCode'],
    include: {
      model: Country,
      attributes: ['name'],
    }
  });
    response.json(result)
  })

 


  module.exports = currencyCountryNameRouter;

 