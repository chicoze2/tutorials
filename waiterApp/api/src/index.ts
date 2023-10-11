import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';

import { router }  from './router';

const app = express();

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(express.json());
app.use(router);

mongoose.connect('mongodb://localhost:27017')
  .then(() => {

    app.listen(3000, () => {
      console.log('👂 listening on http://localhost:3000');
    });


  });
