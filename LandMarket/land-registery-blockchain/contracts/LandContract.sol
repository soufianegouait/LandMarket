// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22;
pragma experimental ABIEncoderV2;

contract LandContract {
	uint public landCount = 0;
	struct LandStruct {
		uint landNumber;
 		uint area;
 		string addr;
		string description;
 		address owner;
 		bool verificationStatus;
 		uint price;
	}
	LandStruct[] lands;

	constructor () public {
		createLand(11, "Morocco", "ENSIAS, Avenue MohamedBen Abdellah Regragui,Madinat Al Irfane, Rabat.", 100000);
	}

	function getAllLands() public view returns (LandStruct[] memory) {
		return lands;
	}

	function createLand(uint area, string memory description, string memory addr, uint price) public {
		landCount++;
		lands.push(LandStruct(landCount, area, description, addr, msg.sender, false, price));
	}

	function verifyLand(uint _id) public {
		lands[_id].verificationStatus = true;
	}
 
	function getLand(uint _id) public view returns (LandStruct memory) {
		return lands[_id];
	}

	function modifyLand(uint _id, uint area, string memory description, string memory addr, uint price) public {
		lands[_id].area = area;
		lands[_id].description = description;
		lands[_id].addr = addr;
		lands[_id].price = price;
	}

	function transferLand(uint _id, address _newOwner) public {
		lands[_id].owner = _newOwner;
	}

}
