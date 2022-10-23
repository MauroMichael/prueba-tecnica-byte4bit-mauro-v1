import styles from "../../styles/Product.module.css";
import { checkout } from "../../checkout";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default function Product({ name, image, price, id, stripePrice }) {
  const { user } = useUser();

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
      </li>
    </div>
  );
}
