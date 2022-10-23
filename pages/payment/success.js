import  Link from 'next/link';
import styles from '../../styles/Success.module.css';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';



export default function success({datos}) {
	useEffect(() => {return () => {
		 emailjs.send("gmail","template_63nbc68",{
			to_name: datos.user.name,
			from_name: "Byte Store",
			message: "Your payment was aproved. We hope you to come back.",
			to_mail: datos.user.email,
			}, "QgarNshOFEk1LCngs")
	}})

	return (
		<div className={styles.success}>
			<h1>Your transaction was succeeded!</h1>
			<img className={styles.greenCk} src={'/Check_green_icon.svg.png'}/>
			<p>Thanks for buying with us</p>
				<Link href='/'>
					<button
					 className={styles.btnSc}
					
					 >Home</button>
				</Link>
		</div>
	);
}

export async function getServerSideProps(context) {

	const { query } = context;
	let { orderId } = query;
  
	const Uri = `http://localhost:3000/api/orders/getOrder?orderId=${orderId}`
	
	const consApi = await fetch(Uri)
	const datos = await consApi.json()
  
	return {
	  props: {
		datos,
	  }
	}
  }