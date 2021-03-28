import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers, Wallet } from 'ethers'
import {KOVAN_API_KEY} from '../constants';

export const createKovanWallet = ():Wallet => {
    const provider = new ethers.providers.JsonRpcProvider(KOVAN_API_KEY)
    return ethers.Wallet.createRandom().connect(provider)
}

