// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract BuyMeACoffee {
    struct FeedBack {
        string name;
        string feedBack;
        uint timestamp;
        address from;
    }

    FeedBack[] feedBackArray;

    address payable owner; //my address

    constructor() {
        owner = payable(msg.sender);
    }

    modifier minimumEthersToSend(uint256 _cost) {
        require(msg.value > _cost, "Please send more than 0.001 ether");
        _;
    }

    function funding(
        string calldata name,
        string calldata feedBack
    ) external payable minimumEthersToSend(0.001 ether) {
        owner.transfer(msg.value);
        feedBackArray.push(
            FeedBack(name, feedBack, block.timestamp, msg.sender)
        );
    }

    function getFeedbacks() public view returns (FeedBack[] memory) {
        return feedBackArray;
    }
}
