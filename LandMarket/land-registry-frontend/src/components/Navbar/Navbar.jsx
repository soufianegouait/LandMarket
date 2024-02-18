import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './Navbar.css';
import Logo from '../../assets/logo.svg';
import Metamask from '../../assets/metamask-small.svg';
import { EthereumContext } from "../../context/EthereumContext";
const NavbarComponent = () => {
	const { connectWallet, connectedAccount } = useContext(EthereumContext);
	return (
		<>
		<Navbar>
			<Container className='mb-5'>
				<Navbar.Brand href="#home">
					<img
					alt=""
					src={Logo}
					width="50"
					height="50"
					className="d-inline-block align-top"
					/>{' '}
					<h1 className="title d-inline-block align-top">Lander</h1>
				</Navbar.Brand>
				<Nav>
					<Nav.Link className='title mx-5 mt-3'>Explore</Nav.Link>
					<Nav.Link className='title mx-5 mt-3'>
					Register
					</Nav.Link>
					{ connectedAccount == null ? (
						<button onClick={connectWallet} className='meta-button mx-5 p-0'>
							<h6 className="d-inline-block align-top m-1"> Connect With </h6>
							<img alt="" src={Metamask} width="30" height="30" className="d-inline-block align-top" />
						</button>
					) : (<h6 className ='title mx-5 mt-4'>{connectedAccount}</h6>) }
				</Nav>
			</Container>
		</Navbar>
		</>
		);
};
export default NavbarComponent;
