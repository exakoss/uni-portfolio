import Constants from 'expo-constants';

export const DAY_IN_SECONDS:number = 86400
export const TIMESTAMP_INTERVAL:number = 600
export const GWEI_IN_ETH:number = 1000000000
export const BUNDLE_ID:string = '1'
export const KOVAN_API_KEY:string = Constants.manifest.extra.kovanKey
export const RINKEBY_API_KEY:string =  Constants.manifest.extra.rinkebyKey
export const MAINNET_API_KEY:string = Constants.manifest.extra.mainnetKey

export const SNX_ADDRESS:string = "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f"

export const BASIC_ABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    }
]
