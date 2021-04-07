import {useDispatch} from 'react-redux';
import {setSNXPrice} from '../reducers/snxPriceReducer';
import {getCurrentSNXPrice} from '../utils/synthTools';

const useSNX = async () => {
    const dispatch = useDispatch()
    const newSNXPrice = await getCurrentSNXPrice().then(result => result)
    dispatch(setSNXPrice(newSNXPrice))
}

export default useSNX
