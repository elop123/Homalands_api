import express from 'express';
import sequelize from './config/sequelizeConfig.js';


const app = express();

app.get("/", (req, res) => {
  res.send('Hello World!');
});

// Sync Route
app.get('/test', async (req, res) => {
    try {
      await sequelize.authenticate();
      res.send('There is connection to the server');
    } catch (error) {
      res.status(500).send('Error! Could not connect to database:');
    }
  });

app.listen(4242, () => {
  console.log("Express server kører....");
});