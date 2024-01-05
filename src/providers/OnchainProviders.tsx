import React, { ReactNode } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  rainbowWallet,
  braveWallet,
  coinbaseWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { getChainsForEnvironment } from '../utils/chainConfiguration';

type Props = { children: ReactNode };

// TODO Docs ~~~
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '';
if (!projectId) {
  const providerErrMessage =
    'To connect to all Wallets you need to provide a NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable';
  throw new Error(providerErrMessage);
}

// TODO Docs ~~~
const supportedChains = getChainsForEnvironment();
if (!supportedChains) {
  throw new Error('Must configure supported chains in utils/chainConfiguration');
}
const { chains, publicClient } = configureChains(supportedChains, [publicProvider()]);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [coinbaseWallet({ appName: 'buildonchainapps', chains })],
  },
  {
    groupName: 'Other Wallets',
    wallets: [
      rainbowWallet({ projectId, chains }),
      metaMaskWallet({ chains, projectId }),
      braveWallet({ chains }),
      trustWallet({ chains, projectId }),
    ],
  },
]);

/**
 * It handles the configuration for all hooks with CoinbaseWalletConnector
 * and supports connecting with Coinbase Wallet.
 */
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

/**
 * TODO Docs ~~~
 */
function OnchainProviders({ children }: Props) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

export default OnchainProviders;
