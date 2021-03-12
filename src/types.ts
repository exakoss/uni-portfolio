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
