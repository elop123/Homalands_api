import express from 'express'
import { imagesModel } from '../models/imagesModel.js'
import { estate_image_relModel } from '../models/estate_image_relModel.js'


export const imagesController = express.Router()

//Relations
imagesModel.hasMany(estate_image_relModel)
estate_image_relModel.belongsTo(imagesModel)


//Route to list(Read)
imagesController.get('/images', async(req,res)=>{
//res.send('get list')
   try {
       const data = await imagesModel.findAll({
       
   });

       if(!data || data.length === 0) {
          return res.json({ message: 'No data found'})
      }
      res.json(data)
  } catch (error) {
      console.error(`Could not get images list: ${error}`)
 }
})

//Route to details (Read)
imagesController.get('/images/:id([0-9]*)', async(req,res)=>{
  try {
     const { id } = req.params
     const data = await imagesModel.findOne({ where: { id: id },

     })

     if(!data) {
         return res.json({ message: `Could not find image on id #${id}` })
     }

     return res.json(data);
 
 } catch (error) {
     console.error(`Could not get city details: ${error}`)        
 }
})


// Route to create (CREATE)
imagesController.post('/images', async (req, res) => {
    const {filename, author, description, image_id} = req.body;
    
    if( !filename || !author  || !description || ! image_id) {
        return res.json({ message: 'Missing required data' })
    }
    try {
        const result = await imagesModel.create({
             filename, author, description, image_id})
        res.status(201).json(result)
    } catch (error) {
        return res.json({ message: `Could not create images: ${error.message}`})
    }
 })

 //Route til update
imagesController.put('/images', async(req, res)=>{
    const { id, filename, author, description, image_id} = req.body;
    console.log(req.body);
    
   
    if( !id || !filename || !author || !description || !image_id ) {
        return res.status(400).json({ message: 'Missing required data' });
    }
    try {
        const result = await imagesModel.update({
            id, filename, author, description, image_id
        }, {where:{id}})
        if (result === 0) {
            return res.status(404).json({ message: 'Image not found or no changes made' });
        }
        return res.status(200).json({ message: 'Image updated successfully' });
    } catch (error) {
        return res.json({ message: `Could not update image: ${error.message}`})
    }
 })

 //Route til delete
 imagesController.delete('/images/:id([0-9]*)', async(req, res)=>{
    // Henter ID fra URL-parametrene
  const { id } = req.params;
  // Tjekker om et ID er angivet
  if (id) {
    try {
      // Forsøger at slette bilen fra databasen baseret på ID
      await imagesModel.destroy({
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
 