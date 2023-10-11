import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './useCases/categories/listCategories';
import { createCategory } from './useCases/categories/createCategories';
import { listProducts } from './useCases/products/listProducts';
import { createProduct } from './useCases/products/createProducts';


export const router = Router();

const upload = multer({
  storage: multer.diskStorage({

    destination(req, file, callback){
      callback(null,path.resolve(__dirname, '..', 'uploads'));
    }
  })
});

//List categories
router.get('/categories', listCategories);

//Create categories
router.post('/categories',createCategory);

//List products
router.get('/products', listProducts);

//Create product
router.post('/products', upload.single('image'), createProduct);

//Get products by category
router.get('/categories/:categoryId/products', (req, res) => {
  res.send('arrived');
});
//List orders
router.get('/orders', (req, res) => {
  res.send('arrived');
});

//Create order
router.post('/orders', (req, res) => {
  res.send('arrived');
});

//Change order status
router.patch('/orders/:orderId', (req, res) => {
  res.send('arrived');
});
//Delete/cancel order
router.delete('/orders/:orderId', (req, res) => {
  res.send('arrived');
});
