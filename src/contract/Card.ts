import type { Abi } from 'abitype';

const abi: Abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], type: 'error', name: 'CallerIsNotOwner' },
  { inputs: [], type: 'error', name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'address', name: 'owner', type: 'address' },
    ],
    type: 'error',
    name: 'ERC721IncorrectOwner',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    type: 'error',
    name: 'ERC721InsufficientApproval',
  },
  {
    inputs: [{ internalType: 'address', name: 'approver', type: 'address' }],
    type: 'error',
    name: 'ERC721InvalidApprover',
  },
  {
    inputs: [{ internalType: 'address', name: 'operator', type: 'address' }],
    type: 'error',
    name: 'ERC721InvalidOperator',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    type: 'error',
    name: 'ERC721InvalidOwner',
  },
  {
    inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }],
    type: 'error',
    name: 'ERC721InvalidReceiver',
  },
  {
    inputs: [{ internalType: 'address', name: 'sender', type: 'address' }],
    type: 'error',
    name: 'ERC721InvalidSender',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    type: 'error',
    name: 'ERC721NonexistentToken',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    type: 'error',
    name: 'ERC721OutOfBoundsIndex',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address', indexed: true },
      { internalType: 'address', name: 'approved', type: 'address', indexed: true },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256', indexed: true },
    ],
    type: 'event',
    name: 'Approval',
    anonymous: false,
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address', indexed: true },
      { internalType: 'address', name: 'operator', type: 'address', indexed: true },
      { internalType: 'bool', name: 'approved', type: 'bool', indexed: false },
    ],
    type: 'event',
    name: 'ApprovalForAll',
    anonymous: false,
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_fromTokenId', type: 'uint256', indexed: false },
      { internalType: 'uint256', name: '_toTokenId', type: 'uint256', indexed: false },
    ],
    type: 'event',
    name: 'BatchMetadataUpdate',
    anonymous: false,
  },
  {
    inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256', indexed: false }],
    type: 'event',
    name: 'MetadataUpdate',
    anonymous: false,
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address', indexed: true },
      { internalType: 'address', name: 'to', type: 'address', indexed: true },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256', indexed: true },
    ],
    type: 'event',
    name: 'Transfer',
    anonymous: false,
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'approve',
    outputs: [],
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
  },
  {
    inputs: [
      { internalType: 'string', name: '_tokenURI', type: 'string' },
      { internalType: 'address', name: 'recipient', type: 'address' },
    ],
    stateMutability: 'payable',
    type: 'function',
    name: 'mintCard',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    stateMutability: 'view',
    type: 'function',
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    name: 'tokenByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'transferFrom',
    outputs: [],
  },
];

export default abi;
