const express = require('express')  // We import the express application
const currenciesRouter = require('./routers/currencies')
const middleware = require('./utils/middleware')
const cors = require('cors') // Necessary for localhost
const app = express() // Creates an express application in app



/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())


app.use(middleware.morganLogger)
app.use('/api/currencies', currenciesRouter)  // Add currencies routes
app.use(middleware.unknownEndpoint)// Added middleware for unknown

// Starts our server at PORT 3001
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})