// 
const { Sequelize } = require("sequelize");
const pg = require("pg");

const databaseURL = process.env.dB_URL;


const URL='postgres://samina:JgIhH6MTVZVwwaMMpGPy16KJehiN5Yyu@dpg-cmnea1v109ks739ep0d0-a.oregon-postgres.render.com/dbname_f6sq';
// console.log("ENV",process.env);

// Option: Passing parameters separately (other dialects)
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  const sequelize = new Sequelize(URL, {
  // host: process.env.DB_HOST,
  // port:5432,
  // dialect: "postgres",
  dialectModule:pg,
 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.authenticate().then(() => {
  console.log("Succesful Connection");
}) 
.catch((error)=>{
  console.log("UnSuccesful Connection",error);
})
module.exports = sequelize; 




//ANOTHER WAY OF CONNECTING WITH DATABASE THRU SEQUELIZE & AUTHENTICATION

// Database URL -> external URL

// const databaseURL = 'postgres://samina:mwiEpJrQAa14XZIwCswvwkjjd8hBoqGL@dpg-cmk47hgl5elc739tr8j0-a.oregon-postgres.render.com/lecture119'
// Setup sequelize for connecting to our database
// const sequelize = new Sequelize(databaseURL, {
//   dialectModule: pg,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// })

// This authentication authenticates connection, export this
// const authenticateConnection = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('We have successfully connected to database...')
//   } catch (error) {
//     console.log('Unable to connect to database...')
//   }
// }

// module.exports = { sequelize, authenticateConnection }