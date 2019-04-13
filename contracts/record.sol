pragma solidity ^0.5.0;

contract record {
    
    address ownerPatient;
    address creatorDoctor;
    
    bytes32 recordId;
    bytes32 decryptionKey;
    bytes32 doctorSign;
    
    mapping (address => bool) canView;
    mapping (address => bool) canCreate;

    constructor(bytes32 _recordId, address _patient, address _doctor, bytes32 _key, bytes32 _sign) public{
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
        require(canView[viewer] == false, "Already has viewing rights!!");
        canView[viewer] = true;
    }
    
    function revokeViewPermission(address viewer) public{
        require(msg.sender == ownerPatient, "Only patient can revoke permission!!");
        require(canView[viewer] == true, "No need to revoke!!");
        canView[viewer] = false;
    }
    
    function getDecryptionKey() public view returns(bytes32){
        require(canView[msg.sender] == true, "You do not have viewing rights!!");
        return decryptionKey;
    }
}
