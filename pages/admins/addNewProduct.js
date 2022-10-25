import { useState } from "react";
import styles from "../../styles/CreateProduct.module.css";
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function CreateProduct() {
  let initialProduct = {
    name: "",
    price: "",
    image: "",
    stripePrice: "",
  };
  let [product, setProduct] = useState(initialProduct);
  const route = useRouter()


  function handleSubmit(e) {
    e.preventDefault();
    let options = {
      method: "POST",
      body: JSON.stringify(product),
      cache: "default",
    };
    fetch("http://localhost:3000/api/products/createProduct/", options)
    .then(res => res.json())
    .then(notif => {
        alert(notif.response)
    })
    setProduct(initialProduct)
  }

  function handleInputChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className={styles.containerForm}>

        <h1>Create a new product</h1>
        <form  onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="New product name *"
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="height">Price: </label>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
          </div>
          <br />
          <div>
            <label htmlFor="image">Image: </label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleInputChange}
              placeholder="Url Image"
            />
          </div>
          <br />
          <div>
            <label htmlFor="weight">Stripe Id: </label>
            <input
              type="text"
              name="stripePrice"
              value={product.stripePrice}
              onChange={handleInputChange}
              placeholder="stripePrice"
            />
          </div>
          <br />
          <button className={styles.newPsubmit} type="submit">
            Create New Product
          </button>
          <Link href="/">
          <button className={styles.btnHomeCreate}>Home</button>
        </Link>
        </form>
    </div>
  );
}
