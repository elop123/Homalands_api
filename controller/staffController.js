import express from 'express'
import { staffsModel } from '../models/staffsModel.js'


export const staffController = express.Router()


//Route to list(Read)
staffController.get('/staffs', async(req,res)=>{
//res.send('get list')
   try {
       const data = await staffsModel.findAll({
   });

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get staff list: ${error}`)
 }
})

//Route to details (Read)
staffController.get('/staffs/:id([0-9]*)', async(req,res)=>{
  try {
     const { id } = req.params
     const data = await staffsModel.findOne({ where: { id: id },
    
     })

     if(!data) {
         return res.json({ message: `Could not find staff on id #${id}` })
     }

     return res.json(data);
 
 } catch (error) {
     console.error(`Could not get staff details: ${error}`)        
 }
})

// Route to create (CREATE)
staffController.post('/staffs', async (req, res) => {
    const {firstname, lastname, position, image,phone, email} = req.body;
    
    if(  !firstname || !lastname || !position || !image || !phone || !email ) {
        return res.json({ message: 'Missing required data' })
    }
    try {
        const result = await staffsModel.create({
            firstname, lastname, position, image,phone, email})
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create staff: ${error.message}`})
    }
 })

 //Route til update
 staffController.put('/staffs', async(req, res)=>{
     const { id, firstname, lastname, position, image,phone, email} = req.body;
    
     if( !id || !firstname || !lastname || !position || !image || !phone || !email ) {
         return res.status(400).json({ message: 'Missing required data' });
     }
     try {
         const result = await staffsModel.update({
             id, firstname, lastname, position, image,phone, email
         }, {where:{id}})
         if (result === 0) {
             return res.status(404).json({ message: 'Staff not found or no changes made' });
         }
         return res.status(200).json({ message: 'Staff updated successfully' });
     } catch (error) {
         return res.json({ message: `Could not update staff: ${error.message}`})
     }
  })
 
  //Route til delete
  staffController.delete('/staffs/:id([0-9]*)', async(req, res)=>{
     // Henter ID fra URL-parametrene
   const { id } = req.params;
   // Tjekker om et ID er angivet
   if (id) {
     try {
       // Forsøger at slette bilen fra databasen baseret på ID
       await staffsModel.destroy({
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
 