import {useDispatch} from 'react-redux';
import {ETH_PRICE_QUERY} from '../graphql/queries';
import {setETHPrice} from '../reducers/ethPriceReducer';
import {parsePriceToFixedNumber} from '../utils';
import {client} from '../graphql/client';

const useETH = async () => {
    const dispatch = useDispatch()
    const getETHPrice = async (): Promise<number> => {
        let result = await client.query({
            query: ETH_PRICE_QUERY
        })
        return parsePriceToFixedNumber(result.data.bundles[0].ethPrice)
    }
    const newETHPrice = await getETHPrice().then(result => result)
    dispatch(setETHPrice(newETHPrice))
}


export default useETH
