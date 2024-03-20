import { useCallback, useState, useEffect } from 'react';
import { parseEther } from 'viem';
import pinJSONToIPFS from '../../utils/pinJSONtoIPFS';
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import NotConnected from './NotConnected';
import { CARD_CONTRACT_ABI, CARD_CONTRACT_ADDRESS, EXPECTED_CHAIN } from '../../utils/constants';

type CardType = {
  id: number;
  title: string;
  image: string;
};

type SendCardFormProps = {
  selectedCard: CardType | null;
};

const SendCardForm: React.FC<SendCardFormProps> = ({ selectedCard }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState<string>('');
  const [signature, setSignature] = useState('');
  const [sigFailure, setSigFailure] = useState(false);
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const onCorrectNetwork = chain?.id === EXPECTED_CHAIN.id;

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const safelyParseEther = (value: string) => {
    try {
      return value ? parseEther(value) : undefined;
    } catch {
      console.error('Invalid ETH value');
      return undefined;
    }
  };

  const createMetadataJson = (selectedCard: CardType, message: string) => {
    return {
      name: `NFTy Card #${selectedCard.id}`,
      description: 'A nfty greeting card with a personal message!',
      image: selectedCard.image,
      sender: address,
      attributes: [
        {
          trait_type: 'Message',
          value: message,
        },
      ],
    };
  };

  const handleMintAndSend = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!recipient || !selectedCard) {
      alert('Please fill in all required fields');
      return;
    }

    const metadata = createMetadataJson(selectedCard, message);
    const tokenURI = await pinJSONToIPFS(metadata);

    const mintConfig = {
      args: [tokenURI, recipient],
      value: safelyParseEther(value),
    };

    try {
      setLoadingTransaction(true);
      const result = await mintCard({ ...mintConfig });
      console.log('Transaction result:', result);
    } catch (error) {
      console.error('Error in transaction:', error);
      setLoadingTransaction(false);
    }
  };

  const { write: mintCard, data: dataMintCard } = useContractWrite({
    address: CARD_CONTRACT_ADDRESS,
    abi: CARD_CONTRACT_ABI,
    functionName: 'mintCard',
  });

  const { isLoading: transactionInProgress } = useWaitForTransaction({
    hash: dataMintCard?.hash,
    enabled: !!dataMintCard,
    onSuccess() {
      // onComplete();
      setLoadingTransaction(false);
      setRecipient('');
      setMessage('');
    },
    onError() {
      // onComplete();
      setLoadingTransaction(false);
      setRecipient('');
      setMessage('');
    },
  });

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

  const handleValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (/^\d*\.?\d*$/.test(newValue) || newValue === '') {
        setValue(newValue);
      }
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
                type="text"
                value={value}
                id="value"
                className="block w-full rounded-[50px] bg-white bg-opacity-10 p-3 text-sm text-white placeholder-white backdrop-blur-2xl"
                placeholder="Optional: Amount of ETH to gift (e.g. 0.05)"
                onChange={handleValueChange}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              {isClient &&
                (isConnected ? (
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-[50px] bg-white px-6 py-2 text-neutral-900"
                    disabled={loadingTransaction || !selectedCard || !recipient}
                  >
                    {loadingTransaction ? (
                      <>
                        <svg
                          className="-ml-1 mr-3 h-5 w-5 animate-spin text-neutral-900"
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
                ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendCardForm;
