var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MatchFactory = artifacts.require("./MatchFactory.sol")

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
