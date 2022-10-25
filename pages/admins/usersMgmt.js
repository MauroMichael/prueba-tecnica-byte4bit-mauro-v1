import styles from '../../styles/UsersMgmt.module.css'

export default function UsersMngmt({users}) {
    return(
        <div>
            <h1>Users Managment</h1>
            {
                users?.map(u => (
                    <div className={styles.user} key={u.email}>
                    <p>{u.nickname}</p>
                    <p>{u.email}</p>
                    <p>{u.role}</p>
                    <button>Change profile</button>
                    </div>
                ))
            }
        </div>
    )
}

export async function getServerSideProps() {
   
    const res = await fetch('http://localhost:3000/api/users/getUsers')
    const users = await res.json();
        return {
            props: {
                users
            }
        }
       
}