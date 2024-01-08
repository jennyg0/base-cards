import { baseGoerli } from 'viem/chains';
import { contract } from './ContractSpecification';
import CardABI from './Card';
import Custom1155ABI from './Custom1155';

describe('ContractSpecification', () => {
  it('should have the correct contract specifications for the Card contract', () => {
    expect(contract.card).toEqual({
      abi: CardABI,
      [baseGoerli.id]: {
        chain: baseGoerli,
        address: '0x2E983A1Ba5e8b38AAAeC4B440B9dDcFBf72E15d1',
      },
    });
  });

  it('should have the correct contract specifications for the custom1155 contract', () => {
    expect(contract.custom1155).toEqual({
      abi: Custom1155ABI,
      [baseGoerli.id]: {
        chain: baseGoerli,
        address: '0xBB955f815131818D62A220F70F5938daF812522d',
      },
    });
  });
});
