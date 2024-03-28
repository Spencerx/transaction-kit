import { Fragment, JsonFragment } from '@ethersproject/abi';
import { BigNumber, BigNumberish, BytesLike } from 'ethers';
import { Route } from '@lifi/types';
import { PaymasterApi } from '@etherspot/prime-sdk';
import { ExchangeOffer } from '@etherspot/prime-sdk/dist/sdk/data';
import { TransactionStatuses } from '@etherspot/prime-sdk/dist/sdk/data/constants';

export interface ITransaction {
  id?: string;
  to: string;
  value?: BigNumberish;
  data?: string;
}

export interface IProviderWalletTransaction {
  id?: string;
  to: string;
  value?: BigNumberish;
  data?: string;
  chainId?: number;
}

export interface IBatch {
  id?: string;
  chainId?: number;
  transactions?: ITransaction[];
}

export interface EstimatedBatch extends IBatch {
  errorMessage?: string;
  cost?: BigNumber;
  userOp?: UserOp;
}

export interface SentBatch extends EstimatedBatch {
  errorMessage?: string;
  userOpHash?: string;
}

export interface IBatches {
  id?: string;
  batches?: IBatch[];
  onEstimated?: (estimated: EstimatedBatch[]) => void;
  onSent?: (sent: SentBatch[]) => void;
  skip?: boolean;
  paymaster?: PaymasterApi,
}

export type IEstimatedBatches = IBatches & {
  estimatedBatches: EstimatedBatch[];
}

export type ISentBatches = IEstimatedBatches & {
  sentBatches: SentBatch[];
}

export interface IEtherspotContractTransaction {
  id?: string;
  value?: BigNumberish;
  params?: ReadonlyArray<BigNumberish>;
  contractAddress: string;
  methodName: string;
  abi: string | ReadonlyArray<Fragment | JsonFragment | string>;
}

export interface IEtherspotTokenTransferTransaction {
  id?: string;
  value: BigNumberish;
  tokenAddress: string;
  receiverAddress: string;
  tokenDecimals?: number;
}

export interface IEtherspotApprovalTransaction {
  id?: string;
  value: BigNumberish;
  tokenAddress: string;
  receiverAddress: string;
  tokenDecimals?: number;
}

export interface ISameChainSwapOffers {
  type: 'same-chain';
  offers: ExchangeOffer[],
}

export interface ICrossChainSwapOffers {
  type: 'cross-chain';
  offers: Route[],
}

export interface IProviderWalletTransactionEstimated {
  gasCost?: BigNumberish;
  errorMessage?: string;
}

export interface IProviderWalletTransactionSent {
  transactionHash?: string;
  errorMessage?: string;
}

export type IWalletType = 'provider' | 'etherspot-prime';

type EtherspotPromiseOrValue<T> = T | Promise<T>;

interface UserOp {
  sender: EtherspotPromiseOrValue<string>;
  nonce: EtherspotPromiseOrValue<BigNumberish>;
  initCode: EtherspotPromiseOrValue<BytesLike>;
  callData: EtherspotPromiseOrValue<BytesLike>;
  callGasLimit: EtherspotPromiseOrValue<BigNumberish>;
  verificationGasLimit: EtherspotPromiseOrValue<BigNumberish>;
  preVerificationGas: EtherspotPromiseOrValue<BigNumberish>;
  maxFeePerGas: EtherspotPromiseOrValue<BigNumberish>;
  maxPriorityFeePerGas: EtherspotPromiseOrValue<BigNumberish>;
  paymasterAndData: EtherspotPromiseOrValue<BytesLike>;
  signature: EtherspotPromiseOrValue<BytesLike>;
}

// TODO: remove once available on Prime SDK
interface EtherspotErc20TransfersEntity {
  from: string;
  to: string;
  value: number;
  asset?: string;
  address: string;
  decimal: number;
}

// TODO: remove once available on Prime SDK
interface EtherspotNativeTransfersEntity {
  from: string;
  to: string;
  value: string;
  asset?: string;
  address: string;
  decimal: number;
  data: string;
}

// TODO: remove once available on Prime SDK
interface EtherspotNftTransfersEntity {
  from: string;
  to: string;
  value: number;
  tokenId: number;
  asset?: string;
  category: string;
  address: string;
}

// TODO: remove once available on Prime SDK
export interface UserOpTransaction {
  chainId: number;
  sender: string;
  target?: string | null;
  transactionHash: string;
  userOpHash: string;
  actualGasCost: number;
  actualGasUsed: number;
  success: TransactionStatuses;
  timestamp: number;
  paymaster: string;
  value: number;
  blockExplorerUrl: string;
  input: string;
  nonce: number;
  initCode?: string;
  callData?: string;
  accountGasLimits?: string;
  gasFees?: string;
  callGasLimit: BigNumber;
  verificationGasLimit: BigNumber;
  preVerificationGas: BigNumber;
  maxFeePerGas: BigNumber;
  maxPriorityFeePerGas: BigNumber;
  paymasterAndData?: string;
  signature?: string;
  beneficiary?: string;
  nativeTransfers?: EtherspotNativeTransfersEntity[];
  erc20Transfers?: EtherspotErc20TransfersEntity[];
  nftTransfers?: EtherspotNftTransfersEntity[];
}

export type AccountTemplate = 'etherspot' | 'zeroDev' | 'simpleAccount';
