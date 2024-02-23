const path = require('path');
require('dotenv').config({path:path.join(__dirname,'../.env')});

const Currency = require('../models/testCurrency-model');



const createCurrencies = async()=>{

  Currency.sync().then(()=> {
    Currency
    .bulkCreate([
    { id: 62, currencyCode: 'CAD', conversionRate:1 },
    { id: 53, currencyCode: 'USD', conversionRate:0.58 },
    { id: 14, currencyCode: 'PKR', conversionRate:1.25 },
    { id: 25, currencyCode: 'EURO', conversionRate:2 },
    { id: 32, currencyCode: 'YEN', conversionRate:0.75 },
    { id: 44, currencyCode: 'GBP', conversionRate:0.35 },

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

  await createCurrencies();

}
 
initializeData()
