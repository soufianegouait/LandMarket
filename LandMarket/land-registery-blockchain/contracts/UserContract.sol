// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22;
pragma experimental ABIEncoderV2;
contract UserContract {
	uint public userCount = 0;
	struct UserStruct {
		string name;
		uint age;
		string addr;
		address userAddress;
		bool isLandInspector;
		uint totalLandsOwned;
		uint totalEarnings;
		uint totalSpent;
	}
	UserStruct[] users;
	constructor() public {
		createUser("Zin Eddine", 20, "ENSIAS");
		setLandInspector(0);
	}

 	function createUser(string memory name, uint age, string memory addr) public {
 		userCount++;
		users.push(UserStruct(name, age, addr, msg.sender, false, 0, 0, 0));
	}

	function setLandInspector(uint _id) public {
		users[_id].isLandInspector = true;
	}
	function getAllUsers() public view returns (UserStruct[] memory) {
		return users;
	}

	function getUser(uint _id) public view returns (UserStruct memory) {
		return users[_id];
	}

	function modifyUser(uint _id, string memory name, uint age, string memory addr) public {
		users[_id].name = name ;
		users[_id].age = age ;
		users[_id].addr = addr ;
	}

	function increaseLandOwnership(uint _id) public {
		users[_id].totalLandsOwned += 1;
	}

	function increaseEarnings(uint _id, uint amount) public {
		users[_id].totalEarnings += amount;
	}

	function increaseSpendings(uint _id, uint amount) public {
		users[_id].totalSpent += amount;
	}


}