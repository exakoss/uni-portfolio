import 'react-native-get-random-values'
import "@ethersproject/shims"
import { ethers, Wallet } from 'ethers'
import {RINKEBY_API_KEY} from '../constants';

const createRinkebyWallet = ():Wallet => {
    const provider = new ethers.providers.JsonRpcProvider(RINKEBY_API_KEY)
    return ethers.Wallet.createRandom().connect(provider)
}

export {createRinkebyWallet}
