import express from 'express'
import { estatesModel } from '../models/estatesModel.js'
import { citiesModel } from '../models/citiesModel.js'
import sequelize from '../config/sequelizeConfig.js'
import { usersModel } from '../models/usersModel.js'
import { imagesModel } from '../models/imagesModel.js'
import { reviewsModel} from '../models/reviewsModel.js'
import {staffsModel} from '../models/staffsModel.js'
import { favoritesModel } from '../models/favoritesModel.js'
import { energy_labelsModel } from '../models/energy_labelsModel.js'
import { seedFromCsv } from '../utils/seedUtils.js'
import { estate_image_relModel } from '../models/estate_image_relModel.js'
import { estateTypesModel } from '../models/estateTypesModel.js'

export const dbController = express.Router()

dbController.get('/sync', async (req, res)=>{
    try {
        const result = await sequelize.sync({force:true})
        res.send('Database successfully synchronized')
    } catch (error) {
        console.error(`Synchronization error: ${error}`); 
    }
})

// Seed database fra CSV filer
dbController.get('/seedfromcsv', async (req, res) => {
  try {
    // Indsæt data fra CSV filer til de respektive modeller
    await seedFromCsv('city.csv', citiesModel);
    await seedFromCsv('estate-type.csv', estateTypesModel);
    await seedFromCsv('energy-label.csv', energy_labelsModel);
    await seedFromCsv('estate.csv', estatesModel);
    await seedFromCsv('user.csv', usersModel);
    await seedFromCsv('review.csv', reviewsModel);
    await seedFromCsv('favorite.csv', favoritesModel);
    await seedFromCsv('staff.csv', staffsModel)
    await seedFromCsv('image.csv', imagesModel);
    await seedFromCsv('estate-image-rel.csv', estate_image_relModel);
    
    
    
    
   

    // Send succes respons
    res.send({ message: 'Seeding completed' });
  } catch (err) {
    // Fejlhåndtering med respons
    res.status(500).json({ error: err.message });
  }
});
 