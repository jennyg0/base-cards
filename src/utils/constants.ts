import { baseSepolia, localhost } from 'viem/chains';
import { contract } from '../contract/ContractSpecification';

export const EXPECTED_CHAIN = baseSepolia;
export const CARD_CONTRACT_ADDRESS = contract.card[EXPECTED_CHAIN.id].address;
export const CARD_CONTRACT_ABI = contract.card.abi;
