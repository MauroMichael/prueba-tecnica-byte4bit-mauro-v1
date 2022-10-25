import styles from "../../styles/Product.module.css";
import { checkout } from "../../checkout";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Product({ name, image, price, id, stripePrice }) {
  const { user } = useUser();
  const [roleUser, setRoleUser] = useState();
  const route = useRouter();

  useEffect(() => {
    const createUser = () => {
      if (user) {
        let options = {
          method: "POST",
          body: JSON.stringify(user),
          cache: "default",
        };
        fetch("http://localhost:3000/api/users/createUser/", options)
          .then((res) => res.json())
          .then((ObjUser) => {
            setRoleUser(ObjUser.role);
          });
      }
    };
    createUser();
  }, [user]);

  const deleteProduct = () => {
    const removeOpts = {
      method: "DELETE",
    };
    fetch(
      `http://localhost:3000/api/products/deleteProduct?id=${id}`,
      removeOpts
    )
      .then((r) => r.json())
      .then((info) => {
        alert(info);
        route.reload();
      });
  };

  const editProduct = () => {
    console.log('hola')
  };
  return (
    <div>
      <li className={styles.productContainer} key={id}>
        <Link href={`/product/${id}`}>
          <img className={styles.productImg} src={image} alt={name} />
        </Link>
        <p className={styles.productName}>{name}</p>
        <h4 className={styles.productPrice}>
          <span className={styles.moneySign}>US$</span> {price}
        </h4>
        <button
          className={styles.productBtn}
          disabled={user === undefined}
          onClick={() => {
            checkout(
              {
                lineItems: [
                  {
                    price: `${stripePrice}`,
                    quantity: 1,
                  },
                ],
              },
              user,
              id
            );
          }}
        >
          Buy Now!
        </button>
        <div className={styles.adminbts}>
          {roleUser === "admin" ? (
            <button
              className={styles.btnAdmDel}
              type="submit"
              onClick={deleteProduct}
            >
              X
            </button>
          ) : null}
          {roleUser === "admin" ? (
            <button
              className={styles.btnAdmUpd}
              type="submit"
              onClick={editProduct}
            >
              <img className={styles.editImg} src={"/edlit.png"} />
            </button>
          ) : null}
        </div>
      </li>
    </div>
  );
}
