import { useEffect, useState } from 'react';
import { CARD_CONTRACT_ADDRESS, CARD_CONTRACT_ABI } from '../../utils/constants';
import { useAccount, useContractRead } from 'wagmi';
import NotConnected from './NotConnected';
import styles from './NFTGallery.module.css';

type NFTMetadata = {
  tokenId: string;
  metadata: {
    name: string;
    description: string;
    image: string;
    sender: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
  };
};

const NFTGallery = () => {
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentTokenId, setCurrentTokenId] = useState('');
  const { isConnected, address } = useAccount();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // cleanup function
  }, []);

  const nftContractConfig = {
    address: CARD_CONTRACT_ADDRESS,
    abi: CARD_CONTRACT_ABI,
  };

  const { data: balanceData } = useContractRead({
    ...nftContractConfig,
    functionName: 'balanceOf',
    args: [address],
  });
  const balance = balanceData ? Number(balanceData) : 0;

  const { data: tokenIdData } = useContractRead({
    ...nftContractConfig,
    functionName: 'tokenOfOwnerByIndex',
    args: [address, currentIndex],
    watch: isConnected && currentIndex < balance,
  });

  const { data: tokenUriData } = useContractRead({
    ...nftContractConfig,
    functionName: 'tokenURI',
    args: currentTokenId ? [currentTokenId] : [],
    enabled: currentTokenId !== '',
    watch: isConnected && currentTokenId !== '',
  });

  useEffect(() => {
    if (tokenIdData) {
      setCurrentTokenId(tokenIdData.toString());
    }
  }, [tokenIdData]);

  function shortenAddress(address: string) {
    if (!address) return 'No address';
    const match = address.match(/^0x[a-fA-F0-9]{40}$/);
    if (!match) return 'Invalid address';

    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  useEffect(() => {
    const fetchMetadata = async () => {
      if (tokenUriData && typeof tokenUriData === 'string') {
        try {
          const response = await fetch(tokenUriData.replace('ipfs://', 'https://ipfs.io/ipfs/'));
          const metadata = await response.json();
          if (isMounted) {
            setNfts((prev) => {
              const isAlreadyAdded = prev.some((nft) => nft.tokenId === currentTokenId);
              if (isAlreadyAdded) {
                return prev;
              }
              return [...prev, { tokenId: currentTokenId, metadata }];
            });
            setCurrentTokenId('');
          }
        } catch (error) {
          console.error('Error fetching metadata:', error);
        } finally {
          if (isMounted) {
            if (currentIndex < Number(balanceData) - 1) {
              setCurrentIndex((prev) => prev + 1);
            } else {
              setLoading(false);
            }
          }
        }
      }
    };

    fetchMetadata();
  }, [tokenUriData, currentTokenId, currentIndex, balanceData, isMounted]);

  if (loading) {
    return <div>Loading NFTs...</div>;
  }

  return (
    <>
      {isMounted && isConnected ? (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {nfts ? (
            nfts.map((nft, index) => (
              <div key={index} className={`${styles.card}`}>
                <div className={`${styles.cardInner}`}>
                  <div className={`${styles.cardFront} rounded-lg bg-white p-4 shadow-lg`}>
                    <figure>
                      <img
                        src={nft.metadata.image}
                        alt={`NFT ${index + 1}`}
                        className="rounded-xl"
                      />
                    </figure>
                  </div>
                  <div
                    className={`${styles.cardBack} rounded-lg bg-white p-4 text-neutral-900 shadow-lg`}
                  >
                    <h2>{nft.metadata.attributes[0].value}</h2>
                    <p>From: {shortenAddress(nft.metadata.sender)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>no cards yet!</p>
          )}
        </div>
      ) : (
        <NotConnected />
      )}
    </>
  );
};
export default NFTGallery;
