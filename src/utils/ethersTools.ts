// import 'react-native-get-random-values'
import * as Random from 'expo-random'
import "@ethersproject/shims"
import {ethers, Wallet} from 'ethers'
import {BASIC_ABI, KOVAN_API_KEY, MAINNET_API_KEY, RINKEBY_API_KEY} from '../constants';
import {store} from '../store';

export const createRinkebyWallet = ():Wallet => {
    const provider = new ethers.providers.JsonRpcProvider(RINKEBY_API_KEY)
    return ethers.Wallet.createRandom().connect(provider)
}

export const createWallet = async ():Promise<Wallet> => {
    const randomBytes = await Random.getRandomBytesAsync(16);
    const mnemonic = ethers.utils.entropyToMnemonic(randomBytes)
    return ethers.Wallet.fromMnemonic(mnemonic)
}

export const createKovanWallet = async () => {
    const provider = createKovanProvider()
    const newWallet:Wallet = await createWallet()
    return newWallet.connect(provider)
}

export const createMainnetWallet = ():Wallet => {
    const provider = createMainnetProvider()
    return ethers.Wallet.createRandom().connect(provider)
}

export const encryptWallet = async (wallet:Wallet,password:string):Promise<string> => {
    return await wallet.encrypt(password)
}

export const getCurrentBalance = async (wallet:Wallet):Promise<number> => {
    const bigNumberishBalance = await wallet.getBalance()
    return Number(ethers.utils.formatEther(bigNumberishBalance))
}

export const getCurrentGas = async (wallet:Wallet) => {
    return await wallet.getGasPrice()
}

export const getContractCurrentBalance = async (wallet:Wallet,contractAddress:string):Promise<number> => {
    const walletAddress:string = await wallet.getAddress()
    const contract = new ethers.Contract(contractAddress, BASIC_ABI, wallet);
    const balance = await contract.balanceOf(walletAddress)
    return Number(ethers.utils.formatEther(balance))
}

export const createMainnetProvider = () => new ethers.providers.JsonRpcProvider(MAINNET_API_KEY)
export const createKovanProvider = () => new ethers.providers.JsonRpcProvider(KOVAN_API_KEY)

export const isLoggedIn = ():boolean => (store.getState().wallet.wallet !== undefined)
export const isImported = ():boolean => (store.getState().seed.seed! !== '')
