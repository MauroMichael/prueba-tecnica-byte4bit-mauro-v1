import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Product from "../components/Product";
import SearchBox from "../components/SearchBox";

import { useUser } from "@auth0/nextjs-auth0";
import { useEffect,useState } from "react";

export default function Home({ products }) {
  const { user, error, isLoading } = useUser();
  const [ roleUser, setRoleUser ] = useState();

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
            setRoleUser(ObjUser.role)
          });
        }
    };
    createUser();
  }, [user]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Mauro byte4bit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <Link href="http://localhost:3000/">BYTE STORE</Link>
          <SearchBox />
          <div className={styles.log}>
          {roleUser === "admin" ? (
              <Link href="/admins/admin">
                <button className={styles.btns}>Admin</button>
              </Link>
            ) : null}
            <Link href="/api/auth/login">
              <button className={styles.btns} disabled={user}>
                Log In
              </button>
            </Link>
            <Link href="/api/auth/logout">
              <button className={styles.btns} disabled={user === undefined}>
                Log Out
              </button>
            </Link>
          </div>
        </div>
        <ul className={styles.productsContainer}>
          {products.map((e) => (
            <Product
              image={e.image}
              name={e.name}
              price={e.price}
              key={e.id}
              stripePrice={e.stripePrice}
              id={e.id}
            />
          ))}
        </ul>
      </main>

      <footer className={styles.footer}>Powered by Mauro</footer>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products/getProducts");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
