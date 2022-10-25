import models from '../../../databases/models';
import { Op } from 'sequelize'


export default async function handler(req, res) {
    const { Products } = models;
    let { name } = req.query;
 
    if (name) {
        try {
            const productByName = await Products.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` },
                },
             })
            if (productByName.length === 0) {
                return res.status(200).json({ message: 'No products with such name' })
            }
            else {
                res.status(200).json(productByName.slice(0, 10))
            }
        } catch (error) {
            res.status(404).send(error.message)
        } 
    }
    else {
        try {
            let dataProducts = await Products.findAll({})
            res.send(dataProducts)
        }
        catch (error) {
            console.log(error)
            res.status(404).send(error);
        }

    }
}