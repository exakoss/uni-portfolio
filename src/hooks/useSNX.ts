import {store} from '../store';
import {setSNXPrice} from '../reducers/snxPriceReducer';
import {getLatestSynthRate} from '../utils/synthTools';

const useSNX = async () => {
    const newSNXPrice:number = await getLatestSynthRate("SNX")
    store.dispatch(setSNXPrice(newSNXPrice))
}

export default useSNX
