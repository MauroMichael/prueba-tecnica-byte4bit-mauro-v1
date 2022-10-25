import models from "../../../databases/models";

export default async function handler(req, res) {
  const { User } = models;
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}
