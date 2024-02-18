import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LandOwner from '../../assets/landOwner.svg'
import LandInspector from '../../assets/landInspector.svg'
import './Identity.css'

const Identity = ({setAccountType}) => {


	return (
		<>
			<Container className='mt-5'>
				<Row>
					<h2 className='display-3 title text-center'>You Are?</h2>	
				</Row>
				<Row>
					<Col>
						<img 
						src={LandInspector} 
						alt=''
						width="365"
						height="385"
						className="d-inline-block flex align-top mx-5 mt-4"/>
						<button onClick={() => setAccountType('inspector')} className="ex-button mx-5 mt-5">Land Inspector</button>
					</Col>
					<Col>
						<img 
						src={LandOwner} 
						alt=''
						width="466"
						height="460"
						className="d-inline-block align-top mx-5"/>
						<button onClick={() => setAccountType('owner')} className="ex-button mx-5">Land Owner</button>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Identity;