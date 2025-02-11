import express from 'express'
import { energy_labelsModel } from '../models/energy_labelsModel.js'


export const energy_labelsController = express.Router()


//Route to list(Read)
energy_labelsController.get('/energy_labels', async(req,res)=>{
//res.send('get list')
   try {
       const data = await energy_labelsModel.findAll({
   });

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get energy_label list: ${error}`)
 }
})

//Route to details (Read)
energy_labelsController.get('/energy_labels/:id([0-9]*)', async(req,res)=>{
  try {
     const { id } = req.params
     const data = await energy_labelsModel.findOne({ where: { id: id },
    
     })

     if(!data) {
         return res.json({ message: `Could not find city on id #${id}` })
     }

     return res.json(data);
 
 } catch (error) {
     console.error(`Could not get city details: ${error}`)        
 }
})

// Route to create (CREATE)
energy_labelsController.post('/energy_labels', async (req, res) => {
    const {name} = req.body;
    
    if( !name) {
        return res.json({ message: 'Missing required data' })
    }
 
    try {
        const result = await energy_labelsModel.create({
            name})
 
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create energy_label: ${error.message}`})
    }
 })

  //Route til update
 energy_labelsController.put('/energy_labels', async(req, res)=>{
     const { id, name} = req.body;
    
     if( !id || !name  ) {
         return res.status(400).json({ message: 'Missing required data' });
     }
     try {
         const result = await energy_labelsModel.update({
             id, name
         }, {where:{id}})
         if (result === 0) {
             return res.status(404).json({ message: 'Energy_label not found or no changes made' });
         }
         return res.status(200).json({ message: 'Energy_label updated successfully' });
     } catch (error) {
         return res.json({ message: `Could not update energy_label: ${error.message}`})
     }
  })
 
  //Route til delete
  energy_labelsController.delete('/energy_labels/:id([0-9]*)', async(req, res)=>{
     // Henter ID fra URL-parametrene
   const { id } = req.params;
   // Tjekker om et ID er angivet
   if (id) {
     try {
       // Forsøger at slette bilen fra databasen baseret på ID
       await energy_labelsModel.destroy({
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