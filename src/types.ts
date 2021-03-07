export interface TokenAction {
    type: "ADD_TOKEN_ID" | "REMOVE_TOKEN_ID",
    data: string
}

export interface BasicToken {
    name: string,
    symbol: string,
    id: string,
    derivedETH?: string
}

export interface TokenState {
    tokenIds: BasicToken['id'][]
}
