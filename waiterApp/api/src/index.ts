import express from 'express';
import mongoose from 'mongoose';


import { router }  from './router';

const app = express();
app.use(express.json());
app.use(router);
mongoose.connect('mongodb://localhost:27017')
  .then(() => {

    app.listen(3000, () => {
      console.log('👂 listening on http://localhost:3000');
    });


  });

