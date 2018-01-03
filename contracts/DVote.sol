pragma solidity ^0.4.17;

contract DVote {
    
    address creator;
    uint repubCount;
    uint demCount;
    address[] whosVoted;
    mapping(address => string) ballot; 

    function DVote() {
        creator = msg.sender;
        repubCount = 0;
        demCount = 0;
        whosVoted.push(creator);
        ballot[creator] = 'Creator cannot vote';
    }
    
    function getCreator() public constant returns (address) {
        return creator;
    }
    
    function voteRepublican(address _address) public returns (bool) {
        for(uint i = 0; i < whosVoted.length; i++){
            if(whosVoted[i] == _address || creator == _address){
                return false;
            }
        }
        whosVoted.push(_address);
        ballot[_address] = 'Republican';
        repubCount = repubCount + 1;
        return true;
    }
    
    function getRepubCount() public constant returns (uint) {
        return repubCount;
    }
    
    function voteDemocrat(address _address) public returns (bool) {
        for(uint i = 0; i < whosVoted.length; i++){
            if(whosVoted[i] == _address || creator == _address){
                return false;
            }
        }
        whosVoted.push(_address);
        ballot[_address] = 'Democrat';
        demCount = demCount + 1;
        return true;
    }

    
    function getDemCount() public constant returns (uint) {
        return demCount;
    }
    
    function getBallot(address _address) public constant returns (string) {
        return ballot[_address];
    }
    
}
