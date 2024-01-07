// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {Script, console2} from 'forge-std/Script.sol';
import {Cards} from '../src/Cards.sol';

contract CardsScript is Script {
  function setUp() public {}

  function run() public {
    vm.startBroadcast();
    Cards cards = new Cards();
    vm.stopBroadcast();
    console2.log('Cards address: ', address(cards));
  }
}
