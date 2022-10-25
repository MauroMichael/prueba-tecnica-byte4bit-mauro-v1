import models from "../../../databases/models";


export default async function handler(req, res) {
    const { Order, Products, User } = models;
    const { orderId } = req.query;

    try {
        const order = await Order.findByPk(orderId);
        let status;
    
        if (order.statusOrder == "Pending") {
          status = { statusOrder: "Succeeded" };
        }
        await order.update(status);
  
        const product = await Products.findAll({
            where: {
                stripePrice: order.checkOutId
            }
        })
        const user = await User.findAll({
            where: {
                email: order.userId
            }
        })
        res.status(200).json({product: product[0], user: user[0]})
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}