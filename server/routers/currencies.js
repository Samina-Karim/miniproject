const currenciesRouter = require('express').Router()

// We need to import the model we created, that is connected to the database via sequelize
const Currency = require('../models/currency-model')
const { QueryTypes } = require('../config/sequelize');
/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
// let currencies = [
//   {
//     id: 1,
//     currencyCode: "CDN",
//     countryId: "Canada",
//     conversionRate: 1
//   },
//   {
//     id: 2,
//     currencyCode: "USD",
//     countryId: "United States of America",
//     conversionRate: 0.75
//   }
// ]

// Generates an id for us
const generateId = () => {
  return Number((Math.random() * 10000).toFixed(0))
}


/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
currenciesRouter.get('/hello', (request, response) => {
  response.send('Hello World!')
})

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
currenciesRouter.get('/', async(request, response) => {
  console.log('received GET request')
  const currencies = await Currency.findAll()
  response.json(currencies)
})


/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
currenciesRouter.get('/:id', async(request, response) => {
  const id = Number(request.params.id)
  // let desiredCurrency = null;
  console.log("ID",id);
  const desiredCurrency= await Currency.findByPk(id);
  console.log("Desired Currency",desiredCurrency);
    
  if (desiredCurrency == null) {
    return response.status(404).send({ error: 'resource not found'})
  }
  response.json(desiredCurrency)

})

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
currenciesRouter.post('/', async(request, response) => {
  console.log('received POST request')
  const currencyCode = request.body.currencyCode;
  const countryId = request.body.countryId;
  const conversionRate = request.body.conversionRate;

  console.log("CurrencyCode", currencyCode);
  console.log("Country", countryId);
  console.log("Conversion Rate", conversionRate);

  if ((currencyCode ==undefined) || (countryId==undefined) || (conversionRate == undefined)){
    return response.status(404).send({ error: 'content missing' })
  }



  const newCurrencyCode = await Currency.create({  
        id: generateId(),
        currencyCode: currencyCode,
        countryId: countryId,
        conversionRate: conversionRate
  });

 
  console.log('New CurrencyCode created:');
 
  response.json(newCurrencyCode)
})



/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
currenciesRouter.put('/:id/:newRate', async(request, response) => {
  console.log('received PUT request');
  const id = Number(request.params.id);
  const newRate=Number(request.params.newRate);

 await Currency.update({conversionRate:newRate}, {
    where: {
      id: id,
    }});
    

  // if(updatedRate.id == undefined){
  //   return response.status(404).send({ error: 'currency missing'})
  // }

  response.status(201).send();
 
})

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
currenciesRouter.delete('/:id', async(request, response) => {
  console.log('received DELETE request');

  const id = Number(request.params.id);

  const deletedCurrency = await Currency.destroy({
    where: {
      id: id
    }
  })
  if (deletedCurrency === 0) {
      return response.status(404).send({ error: 'currency id not found' });
  }
  
  response.status(204).send();

})



module.exports = currenciesRouter;