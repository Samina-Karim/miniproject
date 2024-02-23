require("dotenv").config();

const express = require('express')  // We import the express application
const currenciesRouter = require('./routers/currencies')
const countriesRouter = require('./routers/countries')
const currencyCountryNameRouter=require('./routers/currencyCountryName')
const middleware = require('./utils/middleware')
const cors = require('cors') // Necessary for localhost
const app = express() // Creates an express application in app
const sequelize = require('./config/sequelize')


/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())
app.use(middleware.morganLogger)
app.use('/api/currencies', currenciesRouter)  // Add currencies routes
app.use('/api/countries', countriesRouter)  // Add currencies routes
app.use('/api/currencyCountryName', currencyCountryNameRouter)  // Add currencies routes
app.use(middleware.unknownEndpoint)// Added middleware for unknown

console.log(`We are in environment: ${process.env.NODE_ENV}`)

// Starts our server at PORT 3001
const PORT = 3007
// sequelize.sync().then(() => {
  console.log("Database connected");
  const server=app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })

// }).catch((error)=> {
//   console.log("Error connecting database",error);
// }
// )

module.exports = server





