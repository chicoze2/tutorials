export interface Order{
    _id: string;
    table: string;
    status: string;

    products: Array<
    {
        _id: string; //nao eh id do produto dentro do pedido
        quantity: number;
        product:{
            name: string;
            imagePath: string;
            price: number;
        }
    }>
}
