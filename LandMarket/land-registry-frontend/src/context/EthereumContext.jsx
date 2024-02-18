import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { landContractABI, landContractAddress, userContractABI, userContractAddress } from "../utils/constants";
import { useNavigate } from 'react-router-dom';
export const EthereumContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = (contractAddress, contractABI) => {
  	const provider = new ethers.providers.Web3Provider(ethereum);
  	const signer = provider.getSigner();
	const contract = new ethers.Contract(contractAddress, contractABI, signer);
  	return contract;
}


export const EthereumProvider = ({ children }) => {
	const navigate = useNavigate();
	const [connectedAccount, setConnectedAccount] = useState(null);
	const [userData, setUserData] = useState(null);
	const [usersData, setUsersData] = useState([]);
	const [landsData, setLandsData] = useState([]);
	const getAllLands = async() => {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const landContract = getEthereumContract(landContractAddress, landContractABI);
			const availableLands = await landContract.getAllLands();
			setLandsData(availableLands);
			return availableLands;
		} catch (error) {
			console.log(error);
			throw new Error('Couldn\'t get the list of lands.');
		}
	}

	
	const getAllUsers = async() => {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const userContract = getEthereumContract(userContractAddress, userContractABI);
			const existentUsers = await userContract.getAllUsers();
			setUsersData(existentUsers);
			return existentUsers;
		} catch (error) {
			console.log(error);
			throw new Error('Couldn\'t get the list of users.');
		}
	
	}
	const addLand = async(area, description, address, price) => {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const landContract = getEthereumContract(landContractAddress, landContractABI);
			await landContract.createLand(area, description, address, price);
		} catch (error) {
			console.log(error);
			throw new Error('Couldn\'t add the land.');
		}
	}

	const registerUser = async(name, age, address) => {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const userContract = getEthereumContract(userContractAddress, userContractABI);
			await userContract.createUser(name, age, address);
		} catch (error) {
			console.log(error);
			throw new Error('Couldn\'t register user');
		}
	}

	const setLandInspector = async() => {
		try {
			const users = await getAllUsers();
			const id = users.findIndex(user => user.userAddress.toLowerCase() === connectedAccount.toLowerCase());
			const userContract = getEthereumContract(userContractAddress, userContractABI);
			await userContract.setLandInspector(id);
		} catch (error) {
			console.log(error);
			throw new Error('Couldn\'t find user');
		}
	}

	const getCurrentUserData = async () =>{
		try {
			const users = await getAllUsers();
			const currentAccount = JSON.parse(localStorage.getItem('connectedAccount'));
			const id = users.findIndex(user => user.userAddress.toLowerCase() === currentAccount.toLowerCase());
			setUserData(users[id]);
		} catch (error) {
			console.log(error);
			throw new Error('Couldn\'t find user');
		}
	
	}

	const checkIfWalletIsConnected = async()=> {
		try {
			if (!ethereum) return alert('Please install metamask!');
			const currentAccount = JSON.parse(localStorage.getItem('connectedAccount'));
			if (currentAccount != null) {
				setConnectedAccount(currentAccount);
				await getAllUsers();
				await getCurrentUserData();
				await getAllLands();
				// navigate('/profile');
			} else {
				console.log('no account found!')
			}
			
		} catch (error) {
			console.log(error);
			throw new Error('No Ethereum wallet found!');
		}
	}

	const verifyLand = async(landId) => {
		try {
			const landContract = getEthereumContract(landContractAddress, landContractABI);
			const test = await landContract.verifyLand(landId);
			console.log(test);
		} catch (error) {	
			console.log(error);
			throw new Error('Couldn\'t verify land');
		}
	}

	const connectWallet = async() => {
		try {
			if (!ethereum) return alert('Please install metamask!');

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			setConnectedAccount(accounts[0]);
			// navigate('/profile');
		} catch(error){
			console.log(error);
			throw new Error('No Ethereum wallet found!');
		}
	}
	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	useEffect(() => {
		localStorage.setItem('connectedAccount', JSON.stringify(connectedAccount));
	}, [connectedAccount]);

	return (
		<EthereumContext.Provider value={{ connectWallet, getAllLands, verifyLand, landsData, addLand, userData, usersData, checkIfWalletIsConnected, setLandInspector, setConnectedAccount, connectedAccount, registerUser, getAllUsers }}>
			{children}
		</EthereumContext.Provider>
	)
}