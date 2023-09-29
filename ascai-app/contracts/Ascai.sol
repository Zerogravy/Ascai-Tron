// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// netspec: The Ascai contract manages user subscriptions and payments.
contract Ascai {
    address public owner;
    uint256 public subscriptionPrice = 1000; // 1000 BTT for one month
    uint256 public subscriptionDuration = 30 days; // One month in seconds

    struct Subscription {
        uint256 endDate;
    }

    mapping(address => Subscription) public subscriptions;

    event SubscriptionPurchased(address indexed user, uint256 endDate);
    event Withdrawal(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // netspec: Allows users to purchase a subscription.
    function purchaseSubscription() external payable {
        require(msg.value == subscriptionPrice, "Incorrect subscription price");
        require(
            subscriptions[msg.sender].endDate < block.timestamp,
            "Subscription is still active"
        );

        uint256 newEndDate = block.timestamp + subscriptionDuration;
        subscriptions[msg.sender] = Subscription(newEndDate);

        emit SubscriptionPurchased(msg.sender, newEndDate);
    }

    // netspec: Allows the owner to withdraw funds from the contract.
    function withdraw() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract balance is empty");
        payable(owner).transfer(contractBalance);
        emit Withdrawal(owner, contractBalance);
    }

    // netspec: Get the current balance of the contract (only accessible by the owner).
    function getContractBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    // netspec: Get the subscription validity for the caller.
    function getSubscriptionValidity() public view returns (Subscription memory) {
        return subscriptions[msg.sender];
    }

    // netspec: Update the subscription price (only accessible by the owner).
    function updateSubscriptionPrice(uint256 _newPrice) external onlyOwner {
        subscriptionPrice = _newPrice;
    }

    // netspec: Update the subscription duration (only accessible by the owner).
    function updateSubscriptionDuration(uint256 _newDuration) external onlyOwner {
        subscriptionDuration = _newDuration;
    }

    // netspec: Check if a user's subscription is currently active.
    function isSubscriptionActive(address _user) external view returns (bool) {
        return subscriptions[_user].endDate >= block.timestamp;
    }

}