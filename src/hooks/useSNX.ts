import {store} from '../store';
import {setSNXPrice} from '../reducers/snxPriceReducer';
import {getCurrentSNXPrice} from '../utils/synthTools';

const useSNX = async () => {
    const newSNXPrice = await getCurrentSNXPrice().then(result => result)
    store.dispatch(setSNXPrice(newSNXPrice))
}

export default useSNX
