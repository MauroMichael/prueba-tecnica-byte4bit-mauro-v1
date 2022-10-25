import Product from "../../components/Product";
import styles from "../../styles/ProductDetail.module.css";
import { checkout } from "../../checkout";
import Link from "next/link";

export default function ({ prod }) {
  return (
    <div className={styles.bg}>
        <div className={styles.container}>
        {
          <Product
            image={prod.image}
            name={prod.name}
            price={prod.price}
            key={prod.id}
            stripePrice={prod.stripePrice}
            id={prod.id}
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
          />
        }
        <Link href="/">
          <button className={styles.btnDt}>Home</button>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  let { id } = params;

  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const prod = await res.json();
  return {
    props: {
      prod,
    },
  };
}
