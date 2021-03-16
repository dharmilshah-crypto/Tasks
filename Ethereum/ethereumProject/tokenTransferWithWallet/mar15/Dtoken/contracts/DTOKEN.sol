pragma solidity ^0.4.17;

contract dtoken {
    string public constant name = "DTOKEN";
    string public constant symbol = "DTKN";
    uint8 public constant decimals = 18;
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;

    uint256 totalSupply;

    constructor(uint256 total) public {
        totalSupply = total;
        balances[msg.sender] = totalSupply;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function balanceOf(address sender) public view returns (uint256) {
        return balances[sender];
    }

    function transfer(address receiver, uint256 numTokens)
        public
        returns (bool)
    {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;

        return true;
    }

    function approve(address delegate, uint256 numTokens)
        public
        payable
        returns (bool)
    {
        require(numTokens <= balances[msg.sender]);
        allowed[msg.sender][delegate] =
            allowed[msg.sender][delegate] +
            numTokens;
        //   emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate)
        public
        view
        returns (uint256)
    {
        return allowed[owner][delegate];
    }

    function transferFrom(
        address owner,
        address buyer,
        uint256 numTokens
    ) public returns (bool) {
        require(numTokens <= allowed[owner][msg.sender]);
        balances[owner] = balances[owner] - numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender] - numTokens;
        balances[buyer] = balances[buyer] + numTokens;

        return true;
    }
}
