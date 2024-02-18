import React, { useContext } from 'react'
import './Card.css'
import LandCard from '../../assets/landCard.svg';
import { EthereumContext } from "../../context/EthereumContext";
const Card = ({land}) => {
	const { connectWallet, connectedAccount } = useContext(EthereumContext);
	return (
		<>
			<div className="land-card m-3 d-inline-block">
				<img
				alt='land'
				src={LandCard}	
				width='100%'
				/>
				<div className='info p-3'>
					<h3>{land.name}</h3>
					<h3>{land.price.toNumber()} ETH</h3>
				</div>
			</div>
		</>
		);
};
export default Card;