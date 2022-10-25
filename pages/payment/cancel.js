import  Link from 'next/link';
import styles from '../../styles/Cancel.module.css';
import { useEffect } from 'react';
import emailjs from '@emailjs/browser'

export default function cancel({datos}) {
	useEffect(() => {return () => {
		emailjs.send("gmail","template_63nbc68",{
		   to_name: datos.user.name,
		   from_name: "Byte Store",
		   message: "Your payment was interrupted. Please try again.",
		   to_mail: datos.user.email,
		   }, "QgarNshOFEk1LCngs")
   }},[])
	return (
		<div className={styles.cancel}>
			<h1>There was a problem with your purchase</h1>
			<img className={styles.redx} src={'/in_red_background.svg.png'}/>
			<p>Please try again</p>
				<Link href='/'>
					<button
					 className={styles.btnCl}
					 >Home</button>
				</Link>
		</div>
	);
}

export async function getServerSideProps(context) {

	const { query } = context;
	let { orderId } = query;
  
	const Uri = `http://localhost:3000/api/orders/cancelOrder?orderId=${orderId}`
	
	const consApi = await fetch(Uri)
	const datos = await consApi.json()
  
	return {
	  props: {
		datos,
	  }
	}
  }

