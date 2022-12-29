import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import useForceUpdate from 'hooks/useForceUpdate';
import usePersistentToast from 'hooks/usePersistentToast';

import Web3 from 'helpers/web3';
import { allowedChains } from 'config';

const { ethereum } = window as any;

const WalletContext = createContext({
  account: '',
  disconnect: () => {},
  connect: () => {},
  isConnectedToAllowedNetwork: async () => false,
  refresh: {
    rerender: () => {},
    triggerValue: 0,
  },
});

export const useMetamask = () => useContext(WalletContext);

const isConnectedToAllowedNetwork = async () => {
  const chainId = parseInt(await ethereum?.request({ method: 'eth_chainId' }));
  return !(allowedChains.length > 0 && !allowedChains.find((chain) => chain.id === chainId));
};

const MetamaskContextProvider = ({ children }: any) => {
  const [account, setAccount] = useState<string>('');
  const forceUpdate = useForceUpdate();

  const persistentSwitchChainToast = usePersistentToast(
    'Please connect to one of the supported chains',
    'error',
  );

  const persistentWeb3BrowserToast = usePersistentToast(
    'Ensure you are using a Web3 enabled browser',
    'error',
  );

  const connect = async () => {
    if (!Web3.isEnabledInBrowser()) return persistentWeb3BrowserToast.trigger();

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (e: any) {
      switch (e.code) {
        case 4001:
          toast.info('Please connect to Metamask');
          break;
        case -32002:
          toast.info('Please open Metamask');
          break;
      }
    }
  };

  const disconnect = () => {
    setAccount('');
    forceUpdate.rerender();
  };

  const refresh = async () => {
    forceUpdate.rerender();
    if (await isConnectedToAllowedNetwork()) return persistentSwitchChainToast.dismiss();
    persistentSwitchChainToast.trigger();
  };

  useEffect(() => {
    const init = async () => {
      if (!Web3.isEnabledInBrowser()) return persistentWeb3BrowserToast.trigger();
      if (!(await isConnectedToAllowedNetwork())) persistentSwitchChainToast.trigger();

      ethereum.on('chainChanged', refresh);
      ethereum.on('accountsChanged', (accounts: string[]) => setAccount(accounts[0] || ''));
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    account,
    connect,
    disconnect,
    isConnectedToAllowedNetwork,
    refresh: { rerender: refresh, triggerValue: forceUpdate.triggerValue },
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default MetamaskContextProvider;
