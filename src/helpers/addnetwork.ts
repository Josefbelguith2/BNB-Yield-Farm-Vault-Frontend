export const addBinanceToWallet = async () => {
  try {
    await (window as any).ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${Number(56).toString(16)}`,
          chainName: 'Binance Smart Chain',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
          blockExplorerUrls: ['https://bscscan.com'],
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};
