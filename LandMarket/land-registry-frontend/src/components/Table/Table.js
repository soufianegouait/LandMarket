import React, { useState, useEffect, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EthereumContext } from "../../context/EthereumContext";
import './Table.css';

function createData(landNumber, area, addr, ownerAddress, price) {
  return { landNumber, area, addr, ownerAddress, price };
}


export default function BasicTable() {
	const { landsData, verifyLand, connectedAccount} = useContext(EthereumContext);
	const [rows, setRows] = useState([]);

	const handlRows = async () => {
		const landRows = []
		landsData.forEach(async land => {
			if	(land.verificationStatus === false) {
				const landNumber = await land.landNumber.toNumber()
				const area = await land.area.toNumber()
				const addr = await land.addr
				const ownerAddress = await land.owner
				const price = await land.price.toNumber()
				landRows.push(createData(landNumber, area, addr, ownerAddress, price));
			}
		})
		// console.log(landsData)
		setRows(landRows);
		// console.log(rows)
	}
	const handleVerifyLand = async (landNumber) => {
		// console.log(landNumber)
		await verifyLand(landNumber - 1);
	}
	
	useEffect(() => {
		if(rows.length === 0) {
			handlRows();
		} else {
			console.log('rows already set')
		}
	}, [landsData]);

	return (
		// <></>
		<TableContainer component={Paper}>
		<Table sx={{ minWidth: 650 }} aria-label="simple table">
			<TableHead>
			<TableRow>
				<TableCell>Owner Address</TableCell>
				<TableCell align="right">Land Number</TableCell>
				<TableCell align="right">Land Address</TableCell>
				<TableCell align="right">Area</TableCell>
				<TableCell align="right">Price in ETH</TableCell>
				<TableCell align="right">Verification</TableCell>
			</TableRow>
			</TableHead>
			<TableBody>
			{rows.map((row) => (
				<TableRow
				key={row.landNumber}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
				<TableCell component="th" scope="row">
					{row.ownerAddress}
				</TableCell>
				<TableCell align="right">{row.landNumber}</TableCell>
				<TableCell align="right">{row.addr}</TableCell>
				<TableCell align="right">{row.area}</TableCell>
				<TableCell align="right">{row.price}</TableCell>
				<TableCell align="right"><button className='verification-button' onClick={async () => await handleVerifyLand(row.landNumber)}>Verify</button></TableCell>
				</TableRow>
			))}
			</TableBody>
		</Table>
		</TableContainer>
	);
}
