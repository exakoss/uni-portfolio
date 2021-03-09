import {useDispatch} from 'react-redux';
import {useQuery} from '@apollo/client';
import {ETH_PRICE_QUERY} from '../graphql/queries';
import {setETHPrice} from '../reducers/ethPriceReducer';

const useETH = ():void => {
    const dispatch = useDispatch()
    const {loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
    if (!ethLoading) {
        const ethPriceInUsd:number = Number(parseFloat(ethPriceData.bundles[0].ethPrice).toFixed(2))
        dispatch(setETHPrice(ethPriceInUsd))
    }
}

export default useETH
