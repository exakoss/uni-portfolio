import {store} from '../store';
import {setETHPrice} from '../reducers/ethPriceReducer';
import {getETHPrice} from '../utils';

const useETH = async () => {
    const newETHPrice = await getETHPrice().then(result => result)
    // dispatch(setETHPrice(newETHPrice))
    store.dispatch(setETHPrice(newETHPrice))
}


export default useETH
