pragma solidity ^0.5.0;

contract record {
    
    address ownerPatient;
    address creatorDoctor;
    
    bytes recordId;
    string decryptionKey;
    bytes doctorSign;
    
    mapping (address => bool) canView;
    mapping (address => bool) canCreate;

    constructor(bytes memory _recordId, address _patient, address _doctor, string memory _key, bytes memory _sign) public{
        ownerPatient = _patient;
        recordId = _recordId;
        creatorDoctor = _doctor;
        decryptionKey = _key;
        doctorSign = _sign;
        canView[_doctor] = true;
        canView[_patient] = true;
    }
    
    function giveViewPermission(address viewer) public{
        require(msg.sender == ownerPatient, "Only patient can give permission!!");
        //require(canView[viewer] == false, "Already has viewing rights!!");
        canView[viewer] = true;
    }
    
    function revokeViewPermission(address viewer) public{
        require(msg.sender == ownerPatient, "Only patient can revoke permission!!");
        require(canView[viewer] == true, "No need to revoke!!");
        canView[viewer] = false;
    }
    
    function getDecryptionKey() public view returns(string memory){
        require(canView[msg.sender] == true, "You do not have viewing rights!!");
        return decryptionKey;
    }
}
