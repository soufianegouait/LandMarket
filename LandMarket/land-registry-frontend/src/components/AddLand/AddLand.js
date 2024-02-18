import React, { useContext, useState, useEffect } from "react";
import { EthereumContext } from "../../context/EthereumContext";
import './AddLand.css'
const AddLand = () => {
	const [formData, setFormData] = useState({ area: '', description: '', address: '', price: ''});
	const { addLand } = useContext(EthereumContext);
	const [landWasAdded, setLandWasAdded] = useState(false);
	const [showResponse, setShowResponse] = useState(false);
	const handleChange = (e) => {
		setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData)
		const { area, description, address, price } = formData;
		if (!area || !address || !description || !price) return;
		await addLand(area, description, address, price);
		setLandWasAdded(true);
	}
	
	const handleResponse = () => {
		setShowResponse(false);
		setLandWasAdded(false);
	}

	useEffect(() => {
		if (landWasAdded) {
			setShowResponse(true);
		} else {
			setShowResponse(false);
		}
	}, [landWasAdded]);

	return (
		<>	{showResponse ? 
				<div className="response">
						<h1 className="display-3">Land was added successfully!</h1>
						<button className="sub-button" onClick={handleResponse}>Add a new land.</button>
				</div> 
				:
				<form className="land-form" onSubmit={handleSubmit}>
					<label className="form-label mt-2">Land Area</label>
					<input name="area" type="number" className="form-control" placeholder="Area" onChange={handleChange} />
					<label className="form-label mt-2">Address</label>
					<input name="address" type="text" className="form-control" placeholder="Address" onChange={handleChange}  />
					<label className="form-label mt-2">Description</label>
					<input name="description" type="text" className="form-control" placeholder="Desription" onChange={handleChange} />
					<label className="form-label mt-2">Price in Ethereum</label>
					<input name="price" type="number" className="form-control" placeholder="Price" onChange={handleChange} />
					<button type="submit" className="sub-button  mt-5"  onClick={handleSubmit}>Submit</button>
				</form>				
			}
		</>
	);
}

export default AddLand;