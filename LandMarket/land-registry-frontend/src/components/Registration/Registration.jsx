import React, { useContext, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import './Registration.css'
import { EthereumContext } from "../../context/EthereumContext";

const Regisration = ({accountType}) => {
	const [formData, setFormData] = useState({ name: '', age: '', address: '', verificationCode: ''});
	const { connectedAccount, registerUser, getAllUsers, setLandInspector } = useContext(EthereumContext);
	
	const handleChange = (e) => {
		setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { name, age, address, verificationCode } = formData;
		console.log(formData)
		const users = await getAllUsers();
		const userExists = await users.find(user => user.userAddress.toLowerCase() === connectedAccount.toLowerCase());
		if (userExists) {
			alert('You are already registered!');
			return;
		}
		if (!name || !age || !address) return;
		registerUser(name, age, address);
		
		if (accountType === 'inspector') {
			setLandInspector();
		}
	}
	return (
		<>
			<Container className='mt-5'>
				<Row>
					<h2 className='display-3 title text-center'>{accountType === 'inspector' ? 'Land Inspector Regisration' : 'Land Owner Registration'}</h2>	
				</Row>
				<Row>
					<form className="reg-form" onSubmit={handleSubmit}>
						<label className="form-label mt-2">Name</label>
						<input name="name" type="text" className="form-control" placeholder="Name" onChange={handleChange} />
						<label className="form-label mt-2">Age</label>
						<input name="age" type="number" className="form-control" placeholder="Your age" onChange={handleChange} />
						<label className="form-label mt-2">Address</label>
						<input name="address" type="text" className="form-control" placeholder="Your address" onChange={handleChange} />
						{accountType === 'inspector' && <label className="form-label mt-2">Verification Code</label>}
						{accountType === 'inspector' && <input name="verificationCode" type="text" className="form-control" placeholder="Verification Code" onChange={handleChange} />}
						<button type="submit" className="sub-button  mt-5" onClick={handleSubmit}>Submit</button>
					</form>
				</Row>
			</Container>
		</>
	);
}

export default Regisration;