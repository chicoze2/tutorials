import { Request, Response} from 'express';

import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response){

  try {

    const { name, table, products } = req.body;

    const order = await Order.create({
      name,
      table,
      products
    });

    res.status(201).json(order);

  }catch (err){
    console.error(err);
    res.status(500).json({error: 'Error while placing order.'});
  }
}
