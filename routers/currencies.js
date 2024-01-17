const currenciesRouter = require("express").Router();

/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number,
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
  {
    id: 1,
    currencyCode: "CDN",
    country: "Canada",
    conversionRate: 1,
  },
  {
    id: 2,
    currencyCode: "USD",
    country: "United States of America",
    conversionRate: 0.75,
  },
];

// Generates an id for us
const generateId = () => {
  return Number((Math.random() * 10000).toFixed(0));
};

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
currenciesRouter.get("/hello", (request, response) => {
  response.send("Hello World!");
});

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
currenciesRouter.get("/", (request, response) => {
  console.log("received GET request");
  response.json(currencies);
});

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
currenciesRouter.get("/:id", (request, response) => {
  const id = Number(request.params.id);
  let desiredCurrency = null;

  desiredCurrency = currencies.find((currency) => currency.id == id);
  if (desiredCurrency == null) {
    return response.status(404).send({ error: "resource not found" });
  }
  response.json(desiredCurrency);
});

/**
 * TODO: POST Endpoint
 * @receives a post request to the URL: http://localhost:3001/api/currency,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
currenciesRouter.post("/", (request, response) => {
  console.log("received POST request");
  const currencyCode = request.body.currencyCode;
  const country = request.body.country;
  const conversionRate = request.body.conversionRate;

  console.log("CurrencyCode", currencyCode);
  console.log("Country", country);
  console.log("Conversion Rate", conversionRate);

  if (
    currencyCode == undefined ||
    country == undefined ||
    conversionRate == undefined
  ) {
    return response.status(404).send({ error: "content missing" });
  }
  /** Checks if currencyCode already present then it will not post add and will return with an error message */
  const isCurrencyPresent = currencies.find(
    (currency) => currency.currencyCode == currencyCode
  );

  if (isCurrencyPresent) {
    return response.status(404).send({ error: "currency already present !" });
  }
  /** Otherwise it will create the object and concatenate it to the existing array of currency objects */
  const newCurrency = {
    id: generateId(),
    currencyCode: currencyCode,
    country: country,
    conversionRate: conversionRate,
  };

  currencies = currencies.concat(newCurrency);
  response.json(newCurrency);
});

/**
 * TODO: PUT:id endpoint
 * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
 * with data object enclosed
 * Hint: updates the currency with the new conversion rate
 * @responds by returning the newly updated resource
 */
currenciesRouter.put("/:id/:newRate", (request, response) => {
  console.log("received PUT request");
  const id = Number(request.params.id);
  const newRate = Number(request.params.newRate);

  const updatedRate = currencies.find((currency) => currency.id == id);
  if (updatedRate.id == undefined) {
    return response.status(404).send({ error: "currency missing" });
  }

  updatedRate.conversionRate = newRate;
  response.json(updatedRate);
});

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
currenciesRouter.delete("/:id", (request, response) => {
  console.log("received DELETE request");

  const id = Number(request.params.id);

  const filteredCurrency = currencies.filter((currency) => currency.id !== id);

  if (filteredCurrency.length == currencies.length) {
    return response.status(404).send({ error: "currency id not found" });
  }
  currencies = filteredCurrency;
  response.status(204).send();
});

module.exports = currenciesRouter;
