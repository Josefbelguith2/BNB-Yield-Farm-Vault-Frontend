// abis
import { abi as TokenABI } from 'abis/IERC20.json';
import { abi as VaultABI } from 'abis/Vault.json';

// types
import { IERC20 } from 'types/IERC20';
import { AllowedChainConfig, ContractConfig } from 'types/config';
import { Vault } from 'types/Vault';

// assets
import logo from 'assets/logo.svg';

export const APP_CONFIG = {
  COMPANY: { NAME: 'Pacific Defi', LOGO: logo },
  STAKING_TOKEN: 'BNB',
  REWARD_TOKEN: 'PACIFIC LP',
};

export const allowedChains: AllowedChainConfig[] = [
  { id: 56, name: 'Binance Smart Chain' },
  { id: 97, name: 'Binance Smart Chain Testnet' },
];

export const ContractAddress = {
  TOKEN: '0xb9615d3720c1C1e09dB6d05c38D236d9c26095F6',
  VAULT: '0xd47f7000dC8e6C4a1Ab7D4C3bEB1851b95f94f29',
};

export const contracts: ContractConfig[] = [
  { name: 'TOKEN', abi: TokenABI, address: ContractAddress.TOKEN },
  { name: 'VAULT', abi: VaultABI, address: ContractAddress.VAULT },
];

export interface ContractInstances {
  TOKEN: IERC20;
  VAULT: Vault;
}
