import models from "../../../databases/models";


export default async function handler(req, res) {
    const { Order, Products } = models;
    const { id, userId } = req.query;

    if(!userId) return res.send('Data incomplete').status(204);

    try {
        const product = await Products.findByPk(id);
        const order = await Order.create({
            price: product.price,
            userId,
            checkOutId: product.stripePrice
        })
        res.status(200).json(order.id)
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}