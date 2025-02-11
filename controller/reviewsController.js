import express from 'express'
import { reviewsModel } from '../models/reviewsModel.js'


export const reviewsController = express.Router()


//Route to list(Read)
reviewsController.get('/reviews', async(req,res)=>{
   try {
       const data = await reviewsModel.findAll({
   });

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get review list: ${error}`)
 }
})

//Route to details (Read)
reviewsController.get('/reviews/:id([0-9]*)', async(req,res)=>{
  try {
     const { id } = req.params
     const data = await reviewsModel.findOne({ where: { id: id },
    
     })

     if(!data) {
         return res.json({ message: `Could not find reviews on id #${id}` })
     }

     return res.json(data);
 
 } catch (error) {
     console.error(`Could not get review details: ${error}`)        
 }
})

// Route to create (CREATE)
reviewsController.post('/reviews', async (req, res) => {
    const {subject, comment,num_stars,date,estate_id,user_id, is_active} = req.body;

    if(  !subject || !comment || !num_stars || !date || !estate_id || 
        !user_id || !is_active ) {
        return res.json({ message: 'Missing required data' })
    }
    try {
        const result = await reviewsModel.create({
            subject, comment,num_stars,date,estate_id,user_id, is_active})
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create reviews: ${error.message}`})
    }
 })

 //Route til update
  reviewsController.put('/reviews', async(req, res)=>{
      const { id, subject, comment,num_stars,date,estate_id,user_id, is_active} = req.body;
     
      if( !id || !subject || !comment || !num_stars || !date || !estate_id || 
        !user_id || !is_active ) {
          return res.status(400).json({ message: 'Missing required data' });
      }
      try {
          const result = await reviewsModel.update({
            id, subject, comment,num_stars,date,estate_id,user_id, is_active
          }, {where:{id}})
          if (result === 0) {
              return res.status(404).json({ message: 'Review not found or no changes made' });
          }
          return res.status(200).json({ message: 'Review updated successfully' });
      } catch (error) {
          return res.json({ message: `Could not update review: ${error.message}`})
      }
   })
  
   //Route til delete
   reviewsController.delete('/reviews/:id([0-9]*)', async(req, res)=>{
      // Henter ID fra URL-parametrene
    const { id } = req.params;
    // Tjekker om et ID er angivet
    if (id) {
      try {
        // Forsøger at slette bilen fra databasen baseret på ID
        await reviewsModel.destroy({
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
  