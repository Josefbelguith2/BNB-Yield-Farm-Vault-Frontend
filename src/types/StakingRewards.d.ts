/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type PWithdrawn = ContractEventLog<{
  user: string;
  amount: string;
  reward: string;
  0: string;
  1: string;
  2: string;
}>;
export type Paused = ContractEventLog<{
  account: string;
  0: string;
}>;
export type Recovered = ContractEventLog<{
  token: string;
  amount: string;
  0: string;
  1: string;
}>;
export type RewardAdded = ContractEventLog<{
  reward: string;
  0: string;
}>;
export type RewardPaid = ContractEventLog<{
  user: string;
  reward: string;
  0: string;
  1: string;
}>;
export type RewardsDurationUpdated = ContractEventLog<{
  newDuration: string;
  0: string;
}>;
export type Staked = ContractEventLog<{
  user: string;
  amount: string;
  0: string;
  1: string;
}>;
export type Unpaused = ContractEventLog<{
  account: string;
  0: string;
}>;
export type Withdrawn = ContractEventLog<{
  user: string;
  amount: string;
  0: string;
  1: string;
}>;

export interface StakingRewards extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): StakingRewards;
  clone(): StakingRewards;
  methods: {
    balanceOf(account: string): NonPayableTransactionObject<string>;

    calcPRewards(account: string): NonPayableTransactionObject<string>;

    earned(account: string): NonPayableTransactionObject<string>;

    exit(_amount: number | string | BN): NonPayableTransactionObject<void>;

    getRewardForDuration(): NonPayableTransactionObject<string>;

    lastTimeRewardApplicable(): NonPayableTransactionObject<string>;

    lastUpdateTime(): NonPayableTransactionObject<string>;

    leftOver(): NonPayableTransactionObject<string>;

    notifyRewardAmount(
      reward: number | string | BN
    ): NonPayableTransactionObject<void>;

    owner(): NonPayableTransactionObject<string>;

    pExit(): NonPayableTransactionObject<void>;

    pause(): NonPayableTransactionObject<void>;

    paused(): NonPayableTransactionObject<boolean>;

    penalties(arg0: string): NonPayableTransactionObject<{
      user: string;
      amount: string;
      reward: string;
      timestamp: string;
      penaltyActive: boolean;
      wasPenalized: boolean;
      0: string;
      1: string;
      2: string;
      3: string;
      4: boolean;
      5: boolean;
    }>;

    penaltyPeriod(): NonPayableTransactionObject<string>;

    periodFinish(): NonPayableTransactionObject<string>;

    recoverERC20(
      tokenAddress: string,
      tokenAmount: number | string | BN
    ): NonPayableTransactionObject<void>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    rewardPerToken(): NonPayableTransactionObject<string>;

    rewardPerTokenStored(): NonPayableTransactionObject<string>;

    rewardRate(): NonPayableTransactionObject<string>;

    rewards(arg0: string): NonPayableTransactionObject<string>;

    rewardsDuration(): NonPayableTransactionObject<string>;

    rewardsToken(): NonPayableTransactionObject<string>;

    setRewardsDuration(
      _rewardsDuration: number | string | BN
    ): NonPayableTransactionObject<void>;

    stake(amount: number | string | BN): NonPayableTransactionObject<void>;

    stakingToken(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    unpause(): NonPayableTransactionObject<void>;

    userRewardPerTokenPaid(arg0: string): NonPayableTransactionObject<string>;

    withdrawLeftOver(): NonPayableTransactionObject<void>;
  };
  events: {
    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    PWithdrawn(cb?: Callback<PWithdrawn>): EventEmitter;
    PWithdrawn(options?: EventOptions, cb?: Callback<PWithdrawn>): EventEmitter;

    Paused(cb?: Callback<Paused>): EventEmitter;
    Paused(options?: EventOptions, cb?: Callback<Paused>): EventEmitter;

    Recovered(cb?: Callback<Recovered>): EventEmitter;
    Recovered(options?: EventOptions, cb?: Callback<Recovered>): EventEmitter;

    RewardAdded(cb?: Callback<RewardAdded>): EventEmitter;
    RewardAdded(
      options?: EventOptions,
      cb?: Callback<RewardAdded>
    ): EventEmitter;

    RewardPaid(cb?: Callback<RewardPaid>): EventEmitter;
    RewardPaid(options?: EventOptions, cb?: Callback<RewardPaid>): EventEmitter;

    RewardsDurationUpdated(cb?: Callback<RewardsDurationUpdated>): EventEmitter;
    RewardsDurationUpdated(
      options?: EventOptions,
      cb?: Callback<RewardsDurationUpdated>
    ): EventEmitter;

    Staked(cb?: Callback<Staked>): EventEmitter;
    Staked(options?: EventOptions, cb?: Callback<Staked>): EventEmitter;

    Unpaused(cb?: Callback<Unpaused>): EventEmitter;
    Unpaused(options?: EventOptions, cb?: Callback<Unpaused>): EventEmitter;

    Withdrawn(cb?: Callback<Withdrawn>): EventEmitter;
    Withdrawn(options?: EventOptions, cb?: Callback<Withdrawn>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "PWithdrawn", cb: Callback<PWithdrawn>): void;
  once(
    event: "PWithdrawn",
    options: EventOptions,
    cb: Callback<PWithdrawn>
  ): void;

  once(event: "Paused", cb: Callback<Paused>): void;
  once(event: "Paused", options: EventOptions, cb: Callback<Paused>): void;

  once(event: "Recovered", cb: Callback<Recovered>): void;
  once(
    event: "Recovered",
    options: EventOptions,
    cb: Callback<Recovered>
  ): void;

  once(event: "RewardAdded", cb: Callback<RewardAdded>): void;
  once(
    event: "RewardAdded",
    options: EventOptions,
    cb: Callback<RewardAdded>
  ): void;

  once(event: "RewardPaid", cb: Callback<RewardPaid>): void;
  once(
    event: "RewardPaid",
    options: EventOptions,
    cb: Callback<RewardPaid>
  ): void;

  once(
    event: "RewardsDurationUpdated",
    cb: Callback<RewardsDurationUpdated>
  ): void;
  once(
    event: "RewardsDurationUpdated",
    options: EventOptions,
    cb: Callback<RewardsDurationUpdated>
  ): void;

  once(event: "Staked", cb: Callback<Staked>): void;
  once(event: "Staked", options: EventOptions, cb: Callback<Staked>): void;

  once(event: "Unpaused", cb: Callback<Unpaused>): void;
  once(event: "Unpaused", options: EventOptions, cb: Callback<Unpaused>): void;

  once(event: "Withdrawn", cb: Callback<Withdrawn>): void;
  once(
    event: "Withdrawn",
    options: EventOptions,
    cb: Callback<Withdrawn>
  ): void;
}
