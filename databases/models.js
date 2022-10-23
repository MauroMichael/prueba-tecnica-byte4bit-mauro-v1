import Products from "./models/product";
import Order from "./models/order";
import User from "./models/user";

const models = {
  Products,
  Order,
  User
};


//Iterates over each model in the db (Task and User) and invokes its associate function (if it has one)
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export default models;
