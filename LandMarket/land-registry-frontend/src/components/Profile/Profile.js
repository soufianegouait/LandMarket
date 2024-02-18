import React, { useContext, useState, useEffect } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import AddLand from '../AddLand/AddLand';
import Table from '../Table/Table';
import Lands from '../Lands/Lands';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DashboardSVG from '../../assets/dashboard.svg';
import AddYourLand from '../../assets/addLand.svg';
import YourLand from '../../assets/yourLand.svg';
import Explore from '../../assets/explore.svg';
import Logout from '../../assets/logout.svg';
import { EthereumContext } from "../../context/EthereumContext";
import { useNavigate } from 'react-router-dom';



function Profile() {
	const { userData, connectedAccount, usersData, connectWallet, checkIfWalletIsConnected } = useContext(EthereumContext);
	const [userInfo, setUserInfo] = useState({name: '', landsOwned: 0, earnings: 0, spent: 0})
	const [isOnUserLands, setIsOnUserLands] = useState(false);
	const [isOnExplore, setIsOnExplore] = useState(false);
	const [isOnDashboard, setIsOnDashboard] = useState(true);
	const [isOnAddLand, setIsOnAddLand] = useState(false);
	const [isLandInspector, setIsLandInspector] = useState(false);
	const navigate = useNavigate();

	const handleIsOnUserLands = () => {
		setIsOnUserLands(true);
		setIsOnExplore(false);
		setIsOnDashboard(false);
		setIsOnAddLand(false);
	}
	
	const handleIsOnDashboard = () => {
		setIsOnUserLands(false);
		setIsOnExplore(false);
		setIsOnDashboard(true);
		setIsOnAddLand(false);
	}

	const handleIsOnExplore = () => {
		setIsOnExplore(true);
		setIsOnUserLands(false);
		setIsOnDashboard(false);
		setIsOnAddLand(false);
	}

	const handleIsOnAddLand = () => {
		setIsOnAddLand(true);
		setIsOnExplore(false);
		setIsOnUserLands(false);
		setIsOnDashboard(false);
	}
	useEffect(() => {
		if(!userData) {
			checkIfWalletIsConnected();
		}
		else {
			setIsLandInspector(userData.isLandInspector)
			setUserInfo(
			{
				name: userData.name,
				landsOwned: userData.totalLandsOwned.toNumber(),
				earnings: userData.totalEarnings.toNumber(),
				spent: userData.totalSpent.toNumber()	
			});
		}
		console.log(usersData);
	}, [userData])

	const handleLogout = () => {
		localStorage.removeItem('connectedAccount');
		navigate('/');
		window.location.reload();
	}

	return (
		<>		
				{
					!isLandInspector  && connectedAccount &&
						<Container fluid className='mt-5 px-5'>
							<Row>
								<h2 className='display-3 title text-center'>Welcome {userInfo.name}</h2>	
							</Row>
							<Row>
								<Col xs={2} className='menu p-0'>
									<button className="p-3 menu-button" onClick={handleIsOnDashboard}>
										<img alt="" src={DashboardSVG} width="30" height="30" className="d-inline-block align-top" />
										Dashboard
									</button>
									<button className="p-3 menu-button" onClick={handleIsOnAddLand}>
										<img alt="" src={AddYourLand} width="30" height="30" className="d-inline-block align-top" />
										Add Your Land
									</button>
									<button className="p-3 menu-button"  onClick={handleIsOnUserLands}>
										<img alt="" src={YourLand} width="30" height="30" className="d-inline-block align-top" />
										Your Lands
									</button>
									<button className="p-3 menu-button"  onClick={handleIsOnExplore}>
										<img alt="" src={Explore} width="30" height="30" className="d-inline-block align-top"/>
										Explore Lands
									</button>
									<button className="p-3 menu-button" onClick={handleLogout}>
										<img alt="" src={Logout} width="30" height="30" className="d-inline-block align-top" />
										Logout
									</button>
								</Col>
								<Col className='content'>
									{isOnDashboard && <Dashboard userInfo={userInfo}/>}
									{isOnAddLand && <AddLand />}
									{isOnUserLands && <Lands userInfo = {userInfo} usersData = {usersData} isOnUserLands = {isOnUserLands} />}
									{isOnExplore && <Lands usersData = {usersData}  userInfo = {userInfo} isOnUserLands = {isOnUserLands} />}
								</Col>
							</Row>
						</Container>
					
				}
				{
					connectedAccount && isLandInspector &&
						<Container fluid className='mt-5 px-5'>
							<Row>
								<h2 className='display-3 title text-center'>Welcome {userInfo.name}</h2>	
							</Row>
							<Row>
								<Col xs={2} className='menu p-0'>
									<button className="p-3 menu-button" onClick={handleIsOnDashboard}>
										<img alt="" src={DashboardSVG} width="30" height="30" className="d-inline-block align-top" />
										Verify Lands
									</button>
									<button className="p-3 menu-button" onClick={handleLogout}>
										<img alt="" src={Logout} width="30" height="30" className="d-inline-block align-top" />
										Logout
									</button>
								</Col>
								<Col className='content'>
									<Table />
								</Col>
							</Row>
						</Container>
				}
				{ !connectedAccount && 
					<Container className='mt-5 d-flex px-5'>
						<button className='sub-button' onClick={connectWallet}>ConnectWallet</button>
					</Container>
				}
					
				
				
		</>

	);
}

export default Profile;
