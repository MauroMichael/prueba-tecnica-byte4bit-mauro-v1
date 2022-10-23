import models from "../../../databases/models";

export default async function handler(req, res) {
    const { User } = models
    let { email, name, nickname, picture } = JSON.parse(req.body);

    let dataUsers = await User.findAll({
        where: { email: email },
    })

    try {
        if(dataUsers.length === 0) {
            await User.create({
                email,
                name,
                nickname,
                picture
            })
            res.send('User created')
        }
        res.send('Welcome to our website')
        
    } catch (error) {
       res.send('Oooops')
    }
}
