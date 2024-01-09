import Image from 'next/image';
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import { contract } from '../../contract/ContractSpecification';
import useCollectionMetadata from '../../../onchainKit/hooks/useCollectionMetadata';
import NotConnected from '../send-card/NotConnected';
import SwitchNetwork from '../send-card/SwitchNetwork';
import { EXPECTED_CHAIN } from '../../utils/constants';

export default function MintContractDemo() {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();

  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;
  const chainContract = contract.custom1155[EXPECTED_CHAIN.id];
  const { collectionName, description, imageAddress, isLoading } = useCollectionMetadata(
    onCorrectNetwork,
    chainContract.address,
    contract.custom1155.abi,
  );

  const { config } = usePrepareContractWrite({
    // TODO: the chainId should be dynamic
    address: chainContract.address,
    abi: contract.custom1155.abi,
    functionName: 'mint',
    args: address ? [address, BigInt(1), BigInt(1), address] : undefined,
    enabled: onCorrectNetwork,
  });

  // A future enhancement would be to use the `isLoading` and `isSuccess`
  // properties returned by `useContractWrite` to indicate transaction
  // status in the UI.
  const { write: mint } = useContractWrite(config);

  if (!isConnected) {
    return <NotConnected />;
  }

  if (!onCorrectNetwork) {
    return <SwitchNetwork />;
  }

  if (isLoading) {
    // A future enhancement would be a nicer spinner here.
    return <span className="text-xl">loading...</span>;
  }

  return (
    <div className="grid grid-cols-1 items-stretch justify-start md:grid-cols-2mint md:gap-9">
      <div className="align-center flex flex-col justify-start gap-5">
        <Image src={imageAddress} alt={collectionName} width="300" height="300" />
      </div>
      <div className="align-center flex flex-col justify-start gap-5">
        <p className="mb-1 text-xl font-bold"> {collectionName}</p>
        <p className="text-sm">{description}</p>
        <button type="button" onClick={mint}>
          Mint for free (requires gas)
        </button>
      </div>
    </div>
  );
}
