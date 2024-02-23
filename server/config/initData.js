const path = require('path');
require('dotenv').config({path:path.join(__dirname,'../.env')});

const Currency = require('./models/currency-model');
const Country = require('./models/country-model');

const createCountries = async()=>{

  Country.sync().then(()=> {
    Country
    .bulkCreate([
    { id: 1, name: 'Canada' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'Pakistan' },
    { id: 4, name: 'UK' },
    { id: 5, name: 'Japan' },
    { id: 6, name: 'Britan' },
    ])
    .then(() => {
      console.log('Bulk insert completed successfully.');
    })
    .catch((error) => {
      console.error('Error during bulk insert:', error);
    });

  })

}

const createCurrencies = async()=>{

  Currency.sync().then(()=> {
    Currency
    .bulkCreate([
    { id: 62, currencyCode: 'CAD', countryId:1, conversionRate:1 },
    { id: 53, currencyCode: 'USD', countryId:2, conversionRate:1 },
    { id: 14, currencyCode: 'PKR', countryId:3, conversionRate:1 },
    { id: 25, currencyCode: 'EURO', countryId:4, conversionRate:1 },
    { id: 32, currencyCode: 'YEN', countryId:5, conversionRate:1 },
    { id: 44, currencyCode: 'GBP', countryId:6, conversionRate:1 },

    ])
    .then(() => {
      console.log('Bulk insert completed successfully.');
    })
    .catch((error) => {
      console.error('Error during bulk insert:', error);
    });

  })

}

const initializeData = async()=>{

  await createCountries();
  await createCurrencies();

}
 
initializeData()
