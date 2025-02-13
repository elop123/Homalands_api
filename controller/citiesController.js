import express from 'express'
import { citiesModel } from '../models/citiesModel.js';


export const citiesController = express.Router()

//Route to list(Read)
citiesController.get('/cities', async(req,res)=>{
//res.send('get list')
   try {
       const data = await citiesModel.findAll();

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get city list: ${error}`)
 }
})

//Route to details (Read)
citiesController.get('/cities/:id([0-9]*)', async(req,res)=>{
  try {
     const { id } = req.params
     const data = await carModel.findOne({ where: { id: id },
      
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
citiesController.post('/cities', async (req, res) => {
    const {name, zipcode, city_id} = req.body;
    
    if( !name || !zipcode || !city_id ) {
        return res.json({ message: 'Missing required data' })
    }
    try {
        const result = await citiesModel.create({
             name, zipcode, city_id})
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create city: ${error.message}`})
    }
 })

 //Route til update
citiesController.put('/cities', async(req, res)=>{
    const { id, name, zipcode, city_id} = req.body;
    console.log(req.body);
    
   
    if( !id || !name || !zipcode || !city_id ) {
        return res.status(400).json({ message: 'Missing required data' });
    }
    try {
        const result = await citiesModel.update({
            id, name, zipcode, city_id
        }, {where:{id}})
        if (result === 0) {
            return res.status(404).json({ message: 'City not found or no changes made' });
        }
        return res.status(200).json({ message: 'City updated successfully' });
    } catch (error) {
        return res.json({ message: `Could not update city: ${error.message}`})
    }
 })

 //Route til delete
 citiesController.delete('/cities/:id([0-9]*)', async(req, res)=>{
    // Henter ID fra URL-parametrene
  const { id } = req.params;
  // Tjekker om et ID er angivet
  if (id) {
    try {
      // Forsøger at slette bilen fra databasen baseret på ID
      await citiesModel.destroy({
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
 