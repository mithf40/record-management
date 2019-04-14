pragma solidity ^0.5.0;

contract patient {
    address patientAddress;
    
    mapping (address => bool) canCreate;
    
    constructor() public {
        patientAddress = msg.sender;
    }
    
    function giveWritePermission(address writer) public{
        require(msg.sender == patientAddress, "You don't have rights!!");
        require(canCreate[writer] == false, "You alredy have write permission!!");
        canCreate[writer] = true;
    }
    
    function revokeWritePermission(address writer) public{
        require(msg.sender == patientAddress, "You don't have rights!!");
        require(canCreate[writer] == true, "No need to revoke permission!!");
        canCreate[writer] = false;
    }
    
    function canCreateRecords(address writer) public view returns(bool){
        return canCreate[writer];
    } 
    
}