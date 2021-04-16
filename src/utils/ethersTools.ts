import 'react-native-get-random-values'
import "@ethersproject/shims"
import {ethers, Wallet, Contract} from 'ethers'
import {RINKEBY_API_KEY, MAINNET_API_KEY, KOVAN_API_KEY} from '../constants';
import {store} from '../store';
import {Network} from '@synthetixio/js';

export const createRinkebyWallet = ():Wallet => {
    const provider = new ethers.providers.JsonRpcProvider(RINKEBY_API_KEY)
    return ethers.Wallet.createRandom().connect(provider)
}

export const createKovanWallet = ():Wallet => {
    const provider = new ethers.providers.JsonRpcProvider(KOVAN_API_KEY)
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

export const getContractCurrentBalance = async (wallet:Wallet,contract:Contract) => {
    return await contract.balanceOf()
}

export const createMainnetProvider = () => new ethers.providers.JsonRpcProvider(MAINNET_API_KEY)
export const createKovanProvider = () => new ethers.providers.JsonRpcProvider(KOVAN_API_KEY)

export const isLoggedIn = ():boolean => (store.getState().wallet.wallet !== undefined)
export const isImported = ():boolean => (store.getState().seed.seed! !== '')
