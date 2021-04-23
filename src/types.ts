import {Wallet} from 'ethers'
import {Network, Synth} from '@synthetixio/js';
import {bool} from 'yup';

//Crypto entities
export type Id = string

export type DataSource = 'UNI' | 'SYNTH'

export interface IdEntry {
    id:Id
}

export interface WatchlistEntry extends IdEntry{
    dataSource: DataSource
}

export interface TokenEntry extends IdEntry{
    derivedETH: string
}

export interface PriceEntry extends IdEntry{
    price:number
}

export interface BasicToken extends TokenEntry{
    name: string,
    symbol: string
}

type NoDerivedETHBasicToken = Omit<BasicToken, "derivedETH">

export interface ExtendedTokenEntry extends BasicToken {
    untrackedVolumeUSD: string,
    totalLiquidity: string,
    txCount: string
}

export interface ExtendedToken extends NoDerivedETHBasicToken {
    currentPrice: number,
    oneDayPrice: number,
    currentLiquidity: number,
    oneDayLiquidity: number,
    twoDaysLiquidity: number,
    currentUntrackedVolume: number,
    oneDayUntrackedVolume: number,
    twoDaysUntrackedVolume: number,
    currentTxs: number,
    oneDayTxs: number,
    twoDaysTxs: number
}

export interface BasicTokenDailyPrice extends BasicToken {
    dailyPrice: number
}

export interface Block {
    id:string,
    number: number,
    timestamp: number
}

export interface BlockOption {
    blockTag: number
}

export interface Bundle {
    ethPrice: string
}

export type NetworkString = keyof typeof Network
//Fetched data entities based on crypto entities

export interface TokenData {
    tokens: BasicToken[]
}

export interface DailyTokenData {
    tokens: TokenEntry[],
    bundles: Bundle[]
}

export interface UnitedTokenData {
    tokenData: TokenData,
    dailyTokenData: DailyTokenData
}

export interface ExtendedTokenData {
    tokens: ExtendedTokenEntry[]
}

export interface SynthData extends Synth {
    formattedRate: number
}

export interface SynthDataDaily extends SynthData {
    formattedRateDaily : number
}

export interface TokenListEntry extends SynthDataDaily {
    quantity?: number,
    address?: string,
    dataSource: 'UNI' | 'SYNTH'
}

export interface SynthDataExtended {
    synth: Synth,
    formattedRate: number,
    formattedRateDaily: number,
    supplyInUSD: number,
    dailySupplyInUSD: number,
    volumeInUSD: number,
    dailyVolumeInUSD: number
}

//Redux states and actions
export interface TokenState {
    tokenIds: BasicToken['id'][]
}

export interface ETHAction {
    type: 'SET_ETH_PRICE',
    data: number
}

export interface ETHState {
    price: number
}

export interface SNXAction {
    type: 'SET_SNX_PRICE',
    data: number
}

export interface SNXState {
    price: number
}

export interface TokenAction {
    type: "ADD_TOKEN_ID" | "REMOVE_TOKEN_ID",
    data: string
}

export interface dailyBlockState {
    blockNumber: number
}

export interface dailyBlockAction {
    type: 'SET_DAILY_BLOCK',
    data: number
}

export interface WalletState {
    wallet: Wallet | undefined;
}

export interface WalletAction {
    type: 'SET_WALLET',
    data: Wallet
}

export interface SeedState {
    seed: string
}

export interface SeedAction {
    type: 'SET_SEED',
    data: string
}

export interface ModalState {
    visible: boolean
}

export interface ModalAction {
    type: 'SET_VISIBILITY',
    data: boolean
}

export interface WatchlistState {
    watchlistEntries: WatchlistEntry[]
}

export interface WatchlistAction {
    type: "ADD_WATCHLIST_ENTRY" | "REMOVE_WATCHLIST_ENTRY",
    data: WatchlistEntry
}
