import models from '../../../databases/models';


export default async function handler(req, res) {
        const { Products } = models;
        const { id } = req.query
           
            const productById = await Products.findByPk(id);
     
        res.status(200).json(productById);

        
}