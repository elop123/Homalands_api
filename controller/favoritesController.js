import express from 'express'
import { favoritesModel } from '../models/favoritesModel.js'


export const favoritesController = express.Router()


//Route to list(Read)
favoritesController.get('/favorites', async(req,res)=>{
//res.send('get list')
   try {
       const data = await favoritesModel.findAll({
   });

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get favorites list: ${error}`)
 }
})

//Route to details (Read)
favoritesController.get('/favorites/:id([0-9]*)', async(req,res)=>{
  try {
     const { id } = req.params
     const data = await favoritesModel.findOne({ where: { id: id },
    
     })

     if(!data) {
         return res.json({ message: `Could not find favorites on id #${id}` })
     }

     return res.json(data);
 
 } catch (error) {
     console.error(`Could not get city details: ${error}`)        
 }
})


// Route to create (CREATE)
favoritesController.post('/favorites', async (req, res) => {
    const {user_id, estate_id} = req.body;
    
    if( !user_id || !estate_id ) {
        return res.json({ message: 'Missing required data' })
    }
    try {
        const result = await favoritesModel.create({
             user_id, estate_id})
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create favorites: ${error.message}`})
    }
 })

 //Route til update
favoritesController.put('/favorites', async(req, res)=>{
    const { id, user_id, estate_id} = req.body;
    console.log(req.body);
    
   
    if( !id || !user_id || !estate_id ) {
        return res.status(400).json({ message: 'Missing required data' });
    }
    try {
        const result = await favoritesModel.update({
            id, user_id, estate_id
        }, {where:{id}})
        if (result === 0) {
            return res.status(404).json({ message: 'Favorites not found or no changes made' });
        }
        return res.status(200).json({ message: 'Favorites updated successfully' });
    } catch (error) {
        return res.json({ message: `Could not update favorites: ${error.message}`})
    }
 })

 //Route til delete
 favoritesController.delete('/favorites/:id([0-9]*)', async(req, res)=>{
    // Henter ID fra URL-parametrene
  const { id } = req.params;
  // Tjekker om et ID er angivet
  if (id) {
    try {
      // Forsøger at slette bilen fra databasen baseret på ID
      await favoritesModel.destroy({
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
 