import express from 'express'
import { estatesTypesModel } from '../models/estatesTypesModel.js'


export const estatesTypesController = express.Router()


//Route to list(Read)
estatesTypesController.get('/estate_types', async(req,res)=>{
//res.send('get list')
   try {
       const data = await estatesModel.findAll({
   });

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get estate_types list: ${error}`)
 }
})

//Route to details (Read)
estatesTypesController.get('/estate_type/:id([0-9]*)', async(req,res)=>{
  try {
     const { id } = req.params
     const data = await estatesTypesModel.findOne({ where: { id: id },
    
     })

     if(!data) {
         return res.json({ message: `Could not find estate_types on id #${id}` })
     }

     return res.json(data);
 
 } catch (error) {
     console.error(`Could not get estate_type details: ${error}`)        
 }
})

// Route to create (CREATE)
estatesTypesController.post('/estate_types', async (req, res) => {
    const {name} = req.body;
    
    if( !name) {
        return res.json({ message: 'Missing required data' })
    }
 
    try {
        const result = await estatesTypesModel.create({
            name
        })
 
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create estate_types: ${error.message}`})
    }
 })

  //Route til update
 estatesTypesController.put('/estate_types', async(req, res)=>{
     const { id, name} = req.body;
    
     if( !id || !name ) {
         return res.status(400).json({ message: 'Missing required data' });
     }
     try {
         const result = await estatesTypesModel.update({
            id, name
         }, {where:{id}})
         if (result === 0) {
             return res.status(404).json({ message: 'Estate_types not found or no changes made' });
         }
         return res.status(200).json({ message: 'Estate_types updated successfully' });
     } catch (error) {
         return res.json({ message: `Could not update estate_types: ${error.message}`})
     }
  })
 
  //Route til delete
  estatesTypesController.delete('/estate_types/:id([0-9]*)', async(req, res)=>{
     // Henter ID fra URL-parametrene
   const { id } = req.params;
   // Tjekker om et ID er angivet
   if (id) {
     try {
       // Forsøger at slette bilen fra databasen baseret på ID
       await estatesTypesModel.destroy({
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