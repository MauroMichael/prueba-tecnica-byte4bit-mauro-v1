import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";

export default function Admin() {
  const [roleUser, setRoleUser] = useState();
  const { user, error, isLoading } = useUser();

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

  return (
    <div>
      <h1>Este es el Admin</h1>
      {roleUser === "admin" ? (
        <Link href="/admins/usersMgmt">
          <button>Users Managment</button>
        </Link>
      ) : null}

      {roleUser === "admin" ? (
        <Link href="/admins/addNewProduct">
          <button>Add product</button>
        </Link>
      ) : null}
    </div>
  );
}
