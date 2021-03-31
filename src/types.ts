import {Wallet} from 'ethers'
//Crypto entities
export type Id = string

export interface IdEntry {
    id:Id
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

export interface Bundle {
    ethPrice: string
}

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
    wallet: Wallet | {};
}

export interface WalletAction {
    type: 'SET_WALLET',
    data: Wallet
}
