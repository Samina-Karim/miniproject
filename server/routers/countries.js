const countriesRouter = require('express').Router()

// We need to import the model we created, that is connected to the database via sequelize
const Country = require('../models/country-model')


// Generates an id for us
const generateId = () => {
  return Number((Math.random() * 10000).toFixed(0))
}



/**
 * TODO: GET Endpoint - retrieve all records
 * @receives a get request to the URL: http://localhost:3001/api/country/
 * @responds with returning the data as a JSON
 */
countriesRouter.get('/', async(request, response) => {
  console.log('received GET request')
  const countries = await Country.findAll()
  response.json(countries)
})




/**
 * TODO: POST Endpoint -POST: add a new a record
 * @receives a post request to the URL: http://localhost:3001/api/country,
 * with data object enclosed
 * @responds by returning the newly created resource
 */
countriesRouter.post('/', async(request, response) => {
  console.log('received POST request');
  const name = request.body.name;
  console.log("Name", name);
  
/** Checks if name already present then it will not post add and will return with an error message */

  const [postName, created] = await Country.findOrCreate({
      where: { name : name},
      defaults: {
        id: generateId(),
        name: name
       }, // Default values if the name is not found
  });

  
  if (created) {
    console.log('New CountryCode created:', postName);
    response.status(200).send(postName.name);
  } else {
    console.log('CountryCode already present !', postName);
    response.status(404).send({error: 'country already present'});
  } 
})
    



/**
 * TODO: DELETE:id Endpoint - DELETE: remove one record
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
countriesRouter.delete('/:id', async(request, response) => {
  console.log('received DELETE request');

  const id = Number(request.params.id);

  const deletedCountry = await Country.destroy({
    where: {
      id: id
    }
  })
  if (deletedCountry === 0) {
      return res.status(404).send({ error: 'country id not found' });
  }
  
  response.status(204).send();

})



module.exports = countriesRouter;