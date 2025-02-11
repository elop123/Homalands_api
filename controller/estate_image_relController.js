import express from 'express'
import { estate_image_relModel } from '../models/estate_image_relModel.js'


export const estate_image_relController = express.Router()


//Route to list(Read)
estate_image_relController.get('/estate_image_rel', async(req,res)=>{
//res.send('get list')
   try {
       const data = await estate_image_relModel.findAll({
   });

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get estate_image_rel list: ${error}`)
 }
})

//Route to details (Read)
estate_image_relController.get('/estate_image_rel/:id([0-9]*)', async(req,res)=>{
  try {
     const { id } = req.params
     const data = await estate_image_relModel.findOne({ where: { id: id },
    
     })

     if(!data) {
         return res.json({ message: `Could not find estate_image_rel on id #${id}` })
     }

     return res.json(data);
 
 } catch (error) {
     console.error(`Could not get estate_image_rel details: ${error}`)        
 }
})

// Route to create (CREATE)
estate_image_relController.post('/estate_image_rel', async (req, res) => {
    const {estate_id, image_id, is_main} = req.body;
    
    if( !estate_id, image_id, is_main) {
        return res.json({ message: 'Missing required data' })
    }
 
    try {
        const result = await estatesTypesModel.create({
            estate_id, image_id, is_main
        })
 
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create estate_image_rek: ${error.message}`})
    }
 })

  //Route til update
 estate_image_relController.put('/estate_image_rel', async(req, res)=>{
     const { id, estate_id, image_id, is_main} = req.body;
    
     if( !id || !estate_id ||  !image_id || !is_main) {
         return res.status(400).json({ message: 'Missing required data' });
     }
     try {
         const result = await estate_image_relModel.update({
            id, estate_id, image_id, is_main
         }, {where:{id}})
         if (result === 0) {
             return res.status(404).json({ message: 'Estate_image_rel not found or no changes made' });
         }
         return res.status(200).json({ message: 'Estate_image_rel updated successfully' });
     } catch (error) {
         return res.json({ message: `Could not update estate_image_rel: ${error.message}`})
     }
  })
 
  //Route til delete
  estate_image_relController.delete('/estate_image_rel/:id([0-9]*)', async(req, res)=>{
     // Henter ID fra URL-parametrene
   const { id } = req.params;
   // Tjekker om et ID er angivet
   if (id) {
     try {
       // Forsøger at slette bilen fra databasen baseret på ID
       await estate_image_relModel.destroy({
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