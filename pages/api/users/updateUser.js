import models from '../../../databases/models'


export default async function handler(req, res) {
    const { User } = models;

    const { email } = req.body;
    try {
        const user = await User.findByPk(email);
        let roleUser;
        console.log(user.role)

        if(user.role === 'admin') {
            roleUser = { role: 'user' }
        } else {
            roleUser = { role: 'admin' };
        }
        await user.update(roleUser);
        return res.status(200).json(roleUser)
    } catch (error) {
        res.status(404).send(error);
    }
}