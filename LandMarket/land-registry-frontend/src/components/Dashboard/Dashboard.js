import React, { useContext, useState, useEffect } from "react";
import './Dashboard.css'
import { EthereumContext } from "../../context/EthereumContext";

const Dashboard = ({userInfo}) => {
	

	return (
		<>
			<div className="dashboard-content">
				<div className= 'owned-card'>
					<h1 className="mt-2">Total Lands Owned</h1>
					<h1 className="display-1">{userInfo.landsOwned}</h1>
				</div>
				<div className= 'earned-card'>
					<h1 className="mt-2">Total Earnings</h1>
					<h1 className="display-1">{userInfo.earnings}</h1>
				</div>
				<div className= 'lost-card'>
					<h1 className="mt-2">Total Spent</h1>
					<h1 className="display-1">{userInfo.spent}</h1>
				</div>
			</div>
		</>
	);
}

export default Dashboard;