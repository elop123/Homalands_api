import express from 'express'
import { estatesModel } from '../models/estatesModel.js'
import { citiesModel } from '../models/citiesModel.js'
import sequelize from '../config/sequelizeConfig.js'
import { usersModel } from '../models/usersModel.js'
import { imagesModel } from '../models/imagesModel.js'
import { reviewsModel} from '../models/reviewsModel.js'
import {staffsModel} from '../models/staffsModel.js'


export const dbController = express.Router()

dbController.get('/sync', async (req, res)=>{
    try {
        const result = await sequelize.sync({force:true})
        res.send('Database successfully synchronized')
    } catch (error) {
        console.error('Synchronization error:${error}'); 
    }
})

// Seed database fra CSV filer
dbController.get('/seedfromcsv', async (req, res) => {
  try {
    // Indsæt data fra CSV filer til de respektive modeller
    await seedFromCsv('estates.csv', estatesModel);
    await seedFromCsv('cities.csv', citiesModel);
    await seedFromCsv('images.csv', imagesModel);
    await seedFromCsv('reviews.csv', reviewsModel);
    await seedFromCsv('staffs.csv', staffsModel);
    await seedFromCsv('users.csv', usersModel);
    
   

    // Send succes respons
    res.send({ message: 'Seeding completed' });
  } catch (err) {
    // Fejlhåndtering med respons
    res.status(500).json({ error: err.message });
  }
});
 