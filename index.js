import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/sequelizeConfig.js'; 
import { dbController } from './controller/dbController.js';
import { estatesModel } from './models/estatesModel.js';

dotenv.config();

const app = express();
const port = 4000; 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



// Default Route
app.get("/", (req, res) => {
    //console.log('Welcome to Homeland website');
    res.send('Welcome to Homeland website');
});

// // Sync Route
// app.get('/sync', async (req, res) => {
//     try {
//         await sequelize.sync({ force: true }); // { force:true } will drop all tables
//         res.send('Data successfully synchronized');
//     } catch (err) {
//         console.error('Error syncing database:', err);
//         res.status(500).send(err.message);
//     }
// });

// Controllers
app.use(dbController);


// 404 Route
app.get('*', (req, res) => {
    res.status(404).send('Error: 404. Could not find file');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});