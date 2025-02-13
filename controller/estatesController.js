import express from 'express'
import { estatesModel } from '../models/estatesModel.js'
import { citiesModel } from '../models/citiesModel.js'
import { energy_labelsModel } from '../models/energy_labelsModel.js'
import { favoritesModel } from '../models/favoritesModel.js'
import {estateTypesModel} from '../models/estateTypesModel.js'
import { reviewsModel } from '../models/reviewsModel.js'


export const estatesController = express.Router()
//Relations
estatesModel.belongsTo(citiesModel)
citiesModel.hasMany(estatesModel)

estatesModel.belongsTo(energy_labelsModel)
energy_labelsModel.hasMany(estatesModel)

estatesModel.belongsTo(favoritesModel)
favoritesModel.hasMany(estatesModel)

estatesModel.belongsTo(estateTypesModel)
estateTypesModel.hasMany(estatesModel)

estatesModel.belongsTo(reviewsModel)
reviewsModel.hasMany(estatesModel)

//Route to list(Read)
estatesController.get('/estates', async(req,res)=>{
//res.send('get list')
   try {
       const data = await estatesModel.findAll({
   });

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get estate list: ${error}`)
 }
})

//Route to details (Read)
estatesController.get('/estates/:id([0-9]*)', async(req,res)=>{
  try {
     const { id } = req.params
     const data = await estatesModel.findOne({ where: { id: id },
    
     })

     if(!data) {
         return res.json({ message: `Could not find estate on id #${id}` })
     }

     return res.json(data);
 
 } catch (error) {
     console.error(`Could not get estate details: ${error}`)        
 }
})

// Route to create (CREATE)
estatesController.post('/estates', async (req, res) => {
    const {address, price,payout,gross,net,cost, num_rooms,num_floors,floor_space,ground_space,
        basement_space,year_of_construction, year_rebuilt,description, floorplan,num_clicks,
        city_id, type_id, energy_label_id} = req.body;
    
    if( !address || !price || !payout || !gross|| !net|| !cost|| !num_rooms || !num_floors || 
        !floor_space || !ground_space|| !basement_space || !year_of_construction ||
        !year_rebuilt || !description || !floorplan || !num_clicks || !city_id  || !type_id ||
        !energy_label_id) {
        return res.json({ message: 'Missing required data' })
    }
 
    try {
        const result = await estatesModel.create({
            address, price,payout,gross,net,cost, num_rooms,num_floors,floor_space,ground_space,
            basement_space,year_of_construction, year_rebuilt,description, floorplan,num_clicks,
            city_id, type_id, energy_label_id
        })
 
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create estate: ${error.message}`})
    }
 })

  //Route til update
 estatesController.put('/estates', async(req, res)=>{
     const { id, address, price,payout,gross,net,cost, num_rooms,num_floors,floor_space,ground_space,
        basement_space,year_of_construction, year_rebuilt,description, floorplan,num_clicks,
        city_id, type_id, energy_label_id} = req.body;
    
     if( !id || !address || !price || !payout || !gross|| !net|| !cost|| !num_rooms || !num_floors || 
        !floor_space || !ground_space|| !basement_space || !year_of_construction ||
        !year_rebuilt || !description || !floorplan || !num_clicks || !city_id  || !type_id ||
        !energy_label_id ) {
         return res.status(400).json({ message: 'Missing required data' });
     }
     try {
         const result = await estatesModel.update({
            id, address, price,payout,gross,net,cost, num_rooms,num_floors,floor_space,ground_space,
            basement_space,year_of_construction, year_rebuilt,description, floorplan,num_clicks,
            city_id, type_id, energy_label_id
         }, {where:{id}})
         if (result === 0) {
             return res.status(404).json({ message: 'Estate not found or no changes made' });
         }
         return res.status(200).json({ message: 'Estate updated successfully' });
     } catch (error) {
         return res.json({ message: `Could not update estate: ${error.message}`})
     }
  })
 
  //Route til delete
  estatesController.delete('/estates/:id([0-9]*)', async(req, res)=>{
     // Henter ID fra URL-parametrene
   const { id } = req.params;
   // Tjekker om et ID er angivet
   if (id) {
     try {
       // Forsøger at slette bilen fra databasen baseret på ID
       await estatesModel.destroy({
         where: { id }
       });
       // Returnerer succesbesked
       res.status(200).send({
         message: `Item is deleted`
       });
     } catch (error) {
       // Send en HTTP-statuskode 500 hvis der opstår en fejl
       res.status(500).send({
         message: `Could not delete: ${error.message}`
       });
     }
   } else {
     // Sender 400 Bad Request-fejl hvis ID er ugyldigt 
     res.status(400).send({
       message: "Id is not valid"
     });
   }
 });