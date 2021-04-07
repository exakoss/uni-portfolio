import 'react-native-get-random-values'
import "@ethersproject/shims"
import {ethers, Wallet} from 'ethers'
import {RINKEBY_API_KEY, MAINNET_API_KEY} from '../constants';
import {store} from '../store';

export const createRinkebyWallet = ():Wallet => {
    const provider = new ethers.providers.JsonRpcProvider(RINKEBY_API_KEY)
    return ethers.Wallet.createRandom().connect(provider)
}

export const createMainnetWallet = ():Wallet => {
    const provider = createMainnetProvider()
    return ethers.Wallet.createRandom().connect(provider)
}

export const encryptWallet = async (wallet:Wallet,password:string):Promise<string> => {
    return await wallet.encrypt(password)
}

export const getCurrentBalance = async (wallet:Wallet) => {
    return await wallet.getBalance()
}

export const createMainnetProvider = () => new ethers.providers.JsonRpcProvider(MAINNET_API_KEY)

export const isLoggedIn = ():boolean => (store.getState().wallet.wallet !== {})
export const isImported = ():boolean => (store.getState().seed.seed! !== '')
