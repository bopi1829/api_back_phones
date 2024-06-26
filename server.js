import express from 'express';
import bodyParser from 'body-parser';

import { phonesRoutes } from './router/phones.js';


const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse apllication /json
app.use(bodyParser.json());

// CREER CRUD API
// 1- GET /api/v1/phones
// 2- GET /api/v1/phones/1
// 3- POST /api/v1/phones
// 4- DELETE /api/v1/phones/1
// 5- PUT /api/v1/phones/1

app.use('/api/v1/phones', phonesRoutes)

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur demarré sur le port ${port}`);
  console.log(`http://localhost:${port}`);
});
