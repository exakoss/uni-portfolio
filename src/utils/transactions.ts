import {SynthetixJS} from '@synthetixio/js';
import {ethers} from 'ethers'


export const exchangesSynthforSynth = async (snxjs:SynthetixJS,baseKey:string,amount:number,quoteKey:string) => {
    const baseKeyBytes32 = ethers.utils.formatBytes32String(baseKey)
    const amountToExchange = ethers.utils.parseEther(String(amount))
    const quoteKeyBytes32 = ethers.utils.formatBytes32String(quoteKey)
    await snxjs.contracts.Synthetix.exchange(baseKeyBytes32,amountToExchange,quoteKeyBytes32)
}

export const exchangeETHForSUSD = async (snxjs:SynthetixJS,exchangedETHAmount:number) =>
    await snxjs.contracts.Depot.exchangeEtherForSynths({value: snxjs.utils.parseEther(String(exchangedETHAmount))})
