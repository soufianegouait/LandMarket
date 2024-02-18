const LandContract = artifacts.require("LandContract");
const UserContract = artifacts.require("UserContract");
module.exports = function(deployer) {
  	deployer.deploy(LandContract);
	deployer.deploy(UserContract);
};
