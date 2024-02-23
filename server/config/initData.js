const path = require('path');
require('dotenv').config({path:path.join(__dirname,'../.env')});

const Country = require('../models/Country')
const Currency = require('../models/Currency')


// Generates an id for us
const generateId = () => {
    return Number((Math.random() * 10000).toFixed(0))
  }

const createCountries = async () =>{
    await Country.sync()
    await Country.bulkCreate([])

}
const createCurrencies = async () =>{
    await Currency.sync()
    await Currency.bulkCreate([])

}

const initializeData = async() =>{

    await createCountries();
    await createCurrencies();
    
}