pragma solidity >=0.4.17;

contract record
{
    address public provider;
    address patient;
    bytes32 public record_hash;
    bytes public provider_sign;
    
    constructor(address pat, bytes32 rec_hash, bytes memory sig) public
    {
        provider = msg.sender;
        patient = pat;
        record_hash = rec_hash;
        provider_sign = sig;
    }
    function gethash() public view returns(bytes32)
    {
        return record_hash;
    }
    function getsign() public view returns(bytes memory)
    {
        return provider_sign;
    }
}
