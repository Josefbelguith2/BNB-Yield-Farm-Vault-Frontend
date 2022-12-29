export const addTokenToWallet = async (address: string, symbol: string) => {
  try {
    await (window as any).ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: address,
          symbol: symbol,
          decimals: 18,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
