import {SynthetixJS} from '@synthetixio/js';
import {ethers} from 'ethers'


export const exchangeSynthForSynth = async (snxjs:SynthetixJS,baseKey:string,amount:number,quoteKey:string) => {
    try {
        const baseKeyBytes32 = ethers.utils.formatBytes32String(baseKey)
        const amountToExchange = ethers.utils.parseEther(String(amount))
        const quoteKeyBytes32 = ethers.utils.formatBytes32String(quoteKey)
        await snxjs.contracts.Synthetix.exchange(baseKeyBytes32,amountToExchange,quoteKeyBytes32)
    } catch (e) {
        console.error(e)
    }
}

//Experimental and uncomplete
export const generateSynthToSynthTransactionWithTracking = async (snxjs:SynthetixJS,baseKey:string,amount:number,quoteKey:string,) => {
    try {
        const baseKeyBytes32 = ethers.utils.formatBytes32String(baseKey)
        const amountToExchange = ethers.utils.parseEther(String(amount))
        const quoteKeyBytes32 = ethers.utils.formatBytes32String(quoteKey)
        await snxjs.contracts.Synthetix.exchangeWithTracking()
    } catch (e) {
        console.error(e)
    }
}

export const estimateGasLimitForExchange = async (snxjs:SynthetixJS,baseKey:string,amount:number,quoteKey:string) => {
    try {
        const baseKeyBytes32 = ethers.utils.formatBytes32String(baseKey)
        const amountToExchange = ethers.utils.parseEther(String(amount))
        const quoteKeyBytes32 = ethers.utils.formatBytes32String(quoteKey)
        const gasEstimate = await snxjs.contracts.Synthetix.estimateGas.exchange(baseKeyBytes32,amountToExchange,quoteKeyBytes32)
        return Number(gasEstimate)
    } catch (e) {
        console.error(e)
    }
}

export const exchangeETHForSUSD = async (snxjs:SynthetixJS,exchangedETHAmount:number) => {
    try {
        await snxjs.contracts.Depot.exchangeEtherForSynths({value: snxjs.utils.parseEther(String(exchangedETHAmount))})
    } catch (e) {
        console.error(e)
    }
}

