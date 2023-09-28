// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract APIListing {
    address public owner;
    uint256 public totalAPIs;

    struct API {
        string name;
        string description;
        string priceCID; // Price in wei (smallest unit of Ether)
        address walletAddress;
        string image; // You can store the image's IPFS hash or its URL
    }

    mapping(uint256 => API) public apis;
    mapping(address => uint256[]) public apisByAddress;

    // Events
    event APIAdded(uint256 indexed apiId, string name, string price);
    event APIUpdated(uint256 indexed apiId, string name, string price);
    event APIDeleted(uint256 indexed apiId);

    function addAPI(
        string memory _name,
        string memory _description,
        string memory _priceCID,
        address _walletAddress,
        string memory _image
    ) public {
        totalAPIs++;
        apis[totalAPIs] = API(_name, _description, _priceCID, _walletAddress, _image);
        apisByAddress[_walletAddress].push(totalAPIs); // Add the API to the array for the given address
        emit APIAdded(totalAPIs, _name, _priceCID);
    }

    function updateAPI(
        uint256 _apiId,
        string memory _name,
        string memory _description,
        string memory _priceCID,
        address _walletAddress,
        string memory _image
    ) public {
        require(_apiId <= totalAPIs, "API does not exist");
        require(apis[_apiId].walletAddress == msg.sender, "You can only update your own APIs");
        apis[_apiId] = API(_name, _description, _priceCID, _walletAddress, _image);
        emit APIUpdated(_apiId, _name, _priceCID);
    }

    function deleteAPI(uint256 _apiId) public {
        require(_apiId <= totalAPIs, "API does not exist");
        require(apis[_apiId].walletAddress == msg.sender, "You can only delete your own APIs");

        // Move the last API to the deleted position and then delete the last entry
        apis[_apiId] = apis[totalAPIs];
        delete apis[totalAPIs];
        totalAPIs--;

        emit APIDeleted(_apiId);
    }

    function getAPI(uint256 _apiId) public view returns (API memory) {
        require(_apiId <= totalAPIs, "API does not exist");
        return apis[_apiId];
    }

    function getAPIsForAddress(address _walletAddress) public view returns (API[] memory) {
        uint256[] memory apiIds = apisByAddress[_walletAddress];
        API[] memory apisForAddress = new API[](apiIds.length);

        for (uint256 i = 0; i < apiIds.length; i++) {
            apisForAddress[i] = apis[apiIds[i]];
        }

        return apisForAddress;
    }
}