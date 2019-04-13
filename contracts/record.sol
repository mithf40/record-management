pragma solidity ^0.5.0;

contract record
{
    address public provider;
    address patient;
    bytes32 public record_hash;
    bytes public provider_sign;
    
    
    function gethash() public view returns(bytes32)
    {
        return record_hash;
    }
    function getsign() public view returns(bytes memory)
    {
        return provider_sign;
    }
}
