/**
 * Necessary imports, make sure you have these packages installed in your server directory
 */
const supertest = require('supertest')
const sequelize = require('../config/sequelize') // Provide a path to your config.js or database.js file, wherever you export that sequelize
const helper = require('./test_helper')
const server = require('../server') // Provide a path to your server.js file, or wherever you are starting your server and add your endpoints via router
const api = supertest(server) // Creates a test api that will send requests where we want them to be sent

beforeEach(async () => {
  // Setup currencies table (if not already setup)
  await helper.init()

  // Clear data and load new entries for tests
  await helper.clearData()
  await helper.load()
})

describe('GET tests', () => {
  /**
   * Completed:
   * This is an example test, where we are checking if we have 2 blogs in the database as expected
   * we added the two blogs in the 'beforeEach' setup phase
   */
  test('we have 2 currencies at the start', async () => {
    const response = await api.get('/api/currencies')
    expect(response.body).toHaveLength(2)
  })

  /**
   * Completed:
   * This is another example test, where we are checking if we are able to get a particular currency as expected.
   * Our test will get the first currency, the Canadian one that we added.
   * You can confirm the identiy of the currency based on the conversionRate and the currencyCode
   * We are restricting it to these two, rather than a complete equals, since the table provides other extraneous values
   * such as time of last update and so on
   */
  test('getting a specific currency', async () => {
    const canadianCurrency = helper.initialCurrencies[0]
    const getId = canadianCurrency.id
    

    // Verify that we get the same currency
    const response = await api
      .get(`/api/currencies/${getId}`)
      .expect(200)

    // As stated above, we will compare the conversionRate and currencyCode
    const currencyReceived = response.body
    expect(canadianCurrency.conversionRate).toEqual(Number(currencyReceived.conversionRate))
    expect(canadianCurrency.currencyCode).toEqual(currencyReceived.currencyCode)
  })
})

/**
 * The tests for POST, PUT, and DELETE are left un-implemented, and you will have to complete them
 * All the helper functions have been provided, and the examples as well are sufficient
 * You will need to do some reading on supertest documentation as well
 * 
 * IMPORTANT: You are only working with currencies, we removed the countries connection to make it a bit simpler
 */

describe('POST tests', () => {
  // Add a currency, and verify that a currency is added to our database
  test('adding a currency', async() => {
    const newTestCurrency = {
      "currencyCode": "YEN",
      "conversionRate": 0.95
    }

    const response = await api
      .post('/api/currencies')
      .send(newTestCurrency)
      .expect(201)
    
    const currencyReceived =response.body;

    const list = await helper.currenciesInDb();

    expect(list).toHaveLength(3);
    expect(newTestCurrency.currencyCode).toEqual(currencyReceived.currencyCode);
    expect(newTestCurrency.conversionRate).toEqual(Number(currencyReceived.conversionRate));


  })
})

describe('PUT tests', () => {
  // Update a currency, and verify that a currency has been updated
  test('updating a currency', async() => {
    const id =2;
    const conversionRate = 0.77;

    const response = await api
     .put(`/api/currencies/${id}/${conversionRate}`)
     .expect(201)

     const currencyUpdated=response.body;
     console.log("Updated",currencyUpdated);

     expect(currencyUpdated.id).toEqual(2);
     expect(Number(currencyUpdated.conversionRate)).toEqual(0.77);

  })
})

describe('DELETE tests', () => {
  // Delete a currency, and verify that a currency has been deleted
  test('deleting a currency', async() => {
    const deleteCurrency =helper.initialCurrencies[1]; // Delete USD
  const id= deleteCurrency.id;

  await api
    .delete(`/api/currencies/${id}`)
    .expect(204)

  })
})

afterAll(async () => {
  // Closes connection after all tests run
  server.close()
  await sequelize.close()
})

