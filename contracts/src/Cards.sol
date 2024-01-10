// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract Cards is ERC721, ERC721Enumerable, ERC721URIStorage {
  uint256 private tokenIdCount;

  constructor() ERC721('NftyCards', 'NFTY') {}

  function mintCard(string memory _tokenURI, address recipient) public payable returns (uint256) {
    tokenIdCount++;

    uint256 newItemId = tokenIdCount;
    _mint(recipient, newItemId);
    _setTokenURI(newItemId, _tokenURI);

    if (msg.value > 0) {
      payable(recipient).transfer(msg.value);
    }

    return newItemId;
  }

  function totalSupply() public view override returns (uint256) {
    return tokenIdCount;
  }

  // The following functions are overrides required by Solidity.

  function _update(
    address to,
    uint256 tokenId,
    address auth
  ) internal override(ERC721, ERC721Enumerable) returns (address) {
    return super._update(to, tokenId, auth);
  }

  function _increaseBalance(
    address account,
    uint128 value
  ) internal override(ERC721, ERC721Enumerable) {
    super._increaseBalance(account, value);
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function supportsInterface(
    bytes4 interfaceId
  ) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
