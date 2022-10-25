import models from "../../../databases/models";

export default async function handler(req, res) {
  const { Products } = models;
  let { name, price, image, stripePrice } = JSON.parse(req.body);

  try {
    await Products.create({
      price,
      name,
      image,
      stripePrice,
    });
    res.JSON({response: "Product created"});
  } catch (error) {
    res.send("Oooops");
  }
}
