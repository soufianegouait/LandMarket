import React, { useContext, useEffect, useState } from 'react'
import './Lands.css'
import Card from '../Card/Card';
import { EthereumContext } from "../../context/EthereumContext";
const Lands = ({userInfo, usersData, isOnUserLands}) => {
	const { getAllLands, connectedAccount, checkIfWalletIsConnected} = useContext(EthereumContext);
	const [yourLands, setUserLands] = useState([]);
	const [usersInfo, setUsersInfo] = useState([]);
	const [landsData, setLandsData] = useState([]);
	const getUserLands = async () => {
		const lands = await getAllLands();
		setLandsData(lands);
		const  userLands = lands.filter(land => land.owner.toLowerCase() === connectedAccount.toLowerCase());
		setUserLands(userLands);
	}
	const handleUsersData = async () => {
		if(!isOnUserLands) {
			setUsersInfo(
				usersData.map(user => {
					return {
						name: user.name,
						address: user.userAddress,
					}
				})
			)
		}
	}
	useEffect(() => {
		getUserLands();
		handleUsersData();
	}, [connectedAccount]);



	return (
		<>
			<div className="your-lands-content">
				{isOnUserLands ?
					yourLands.map(land => {
						const landInfo = {...land, name: userInfo.name}
						return <Card key={landInfo.landNumber.toNumber()} land={landInfo} />
					}) :
					usersInfo.map(user => {
						return landsData.map(land => {
							if (land.owner.toLowerCase() === user.address.toLowerCase()) {
								const landInfo = {...land, name: user.name}
								return <Card key={landInfo.landNumber.toNumber()} land={landInfo} />
							}
							return null;
						})

					})
				}
			</div>
		</>
		);
};
export default Lands;