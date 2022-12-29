export const calculateAPY = (
  totalRewards: number,
  totalStaked: number,
  duration: number,
  stakingTokenPrice: number,
  rewardTokenPrice: number,
) => {
  return (((totalRewards / duration) * stakingTokenPrice) / (totalStaked * rewardTokenPrice)) * 100 * 265;
};
