import models from '../../../databases/models';


export default async function handler(req, res) {
        const { Products } = models;
        const { id } = req.query
           
            const productById = await Products.findByPk(id);
            let data = productById.name;
            await productById.destroy();
            res.status(200).json(`"${data}" was removed fron your products`)
     

        
}