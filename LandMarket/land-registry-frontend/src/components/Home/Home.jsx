import React, { useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Home.css'
import HomeCard from '../../assets/homeCard.svg'
import { EthereumContext } from "../../context/EthereumContext";
const Home = () => {
	
	
	return (
		<>
			<Container className='mt-5'>
				<Row>
					<Col>
						<h1 className="title display-3 my-5">Discover, buy and sell lands all in one place.
						</h1>
						<h3 className="description my-5">Lander is the world’s first land marketplace based of the Ethereum Blockchain.</h3>]
						<Row>
							<Col><button className="ex-button mx-5">Explore</button></Col>
							<Col><button className="add-button mr-5">Add your land</button></Col>
						</Row>
					</Col>
					<Col>
						<img
						alt=""
						src={HomeCard}
						width="500"
						height="470"
						className="d-inline-block align-top mx-5 home-card"
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Home;