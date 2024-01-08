import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import { baseGoerli, localhost, Chain, baseSepolia } from 'viem/chains';
import { parseEther } from 'viem';
import pinJSONToIPFS from '../../utils/pinJSONtoIPFS';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { contract } from '../../contract/ContractSpecification';
import NotConnected from '../mint/NotConnected';

type CardType = {
  id: number;
  title: string;
  image: string;
};

type SendCardFormProps = {
  selectedCard: CardType | null;
};

const EXPECTED_CHAIN = localhost;

const cardNFTAddress = contract.card[localhost.id].address;
const cardNFTABI = contract.card.abi;

const SendCardForm: React.FC<SendCardFormProps> = ({ selectedCard }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');
  const [signature, setSignature] = useState('');
  const [sigFailure, setSigFailure] = useState(false);
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const createMetadataJson = (selectedCard: CardType, message: string) => {
    return {
      name: `Christmas Card #${selectedCard.id}`,
      description: 'A festive Christmas card with a personal message!',
      image: selectedCard.image,
      attributes: [
        {
          trait_type: 'Message',
          value: message,
        },
      ],
    };
  };

  const { config } = usePrepareContractWrite({
    address: cardNFTAddress,
    abi: cardNFTABI,
    functionName: 'mintCard',
    args: [recipient, message],
    enabled: recipient !== '' && message !== '',
    value: parseEther(value ? value : '0'),
    onSuccess(data) {
      console.log('Success prepare mintCard', data);
    },
  });

  const { write: mintCard, data: dataMintCard } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log('Success write mintCard', data);
    },
  });

  const handleMintAndSend = async () => {
    if (!recipient || !message || !selectedCard) {
      alert('Please fill in all fields');
      return;
    }

    const metadata = createMetadataJson(selectedCard, message);
    const tokenURI = await pinJSONToIPFS(metadata);

    // try {
    //   const tx = await cardNFT.mintCard(tokenURI, recipient);
    //   await tx.wait();
    //   console.log('NFT minted and sent to recipient:', recipient);
    // } catch (error) {
    //   console.error('Error minting and sending NFT:', error);
    // }
  };

  const { isLoading: loadingTransaction } = useWaitForTransaction({
    hash: dataMintCard?.hash,
    enabled: !!dataMintCard,
    onSuccess() {
      // onComplete();
      setRecipient('');
      setMessage('');
    },
    onError() {
      // onComplete();
      setRecipient('');
      setMessage('');
    },
  });

  const handleSubmit = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      mintCard?.();
    },
    [mintCard],
  );

  const handleNameChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setRecipient(event.target.value);
    },
    [setRecipient],
  );

  const handleMessageChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setMessage(event.target.value);
    },
    [setMessage],
  );

  // TODO: make sure only values can be inputed
  const handleValueChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setValue(event.target.value.toString);
    },
    [setValue],
  );

  return (
    <div className="z-10 flex items-center justify-center pt-8">
      <div className="flex w-full max-w-lg flex-col items-center px-4">
        <form onSubmit={handleMintAndSend} className="w-full">
          <div className="rounded-[50px] bg-white bg-opacity-10 p-8 backdrop-blur-2xl">
            {selectedCard ? (
              <figure className="mb-5 flex justify-center ">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="w-1/4 rounded-[50px]"
                />
              </figure>
            ) : null}
            <h3 className="mb-5 text-center">Send Your Card</h3>
            <div className="mb-5">
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                Recipient's ETH Address
              </label>
              <input
                type="text"
                id="name"
                className="block w-full rounded-[50px] bg-white bg-opacity-10 p-3 text-sm text-white placeholder-white backdrop-blur-2xl focus:border focus:border-white"
                placeholder="Enter recipient's wallet address"
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                Personal Message
              </label>
              <textarea
                value={message}
                id="message"
                className="focus:border-white-500 focus:ring-white-500 block w-full rounded-[50px] bg-white bg-opacity-10 p-3 text-sm text-white placeholder-white backdrop-blur-2xl"
                placeholder="Share your thoughts or best wishes **this isn't private**"
                onChange={handleMessageChange}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="value" className="mb-2 block text-sm font-medium text-white">
                Gift Amount in ETH
              </label>
              <input
                type="number"
                value={value}
                id="value"
                className="block w-full rounded-[50px] bg-white bg-opacity-10 p-3 text-sm text-white placeholder-white backdrop-blur-2xl"
                placeholder="Optional: Amount of ETH to gift (e.g. 0.05)"
                onChange={handleValueChange}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              {isConnected ? (
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-[50px] bg-[#cb59ab] px-6 py-2"
                  disabled={loadingTransaction}
                >
                  {loadingTransaction ? (
                    <>
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0116 0H4z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send'
                  )}
                </button>
              ) : (
                <NotConnected />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendCardForm;
