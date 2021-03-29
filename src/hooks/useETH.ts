import {useDispatch} from 'react-redux';
import {setETHPrice} from '../reducers/ethPriceReducer';
import {getETHPrice} from '../utils';

const useETH = async () => {
    const dispatch = useDispatch()
    const newETHPrice = await getETHPrice().then(result => result)
    dispatch(setETHPrice(newETHPrice))
}


export default useETH
