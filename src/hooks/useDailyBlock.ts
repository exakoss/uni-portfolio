// import {useDispatch} from 'react-redux';
import {store} from '../store';
import {setDailyBlock} from '../reducers/dailyBlockReducer';
import {getBlockNumber} from '../utils';

const useDailyBlock = async () => {
    const newDailyBlock = await getBlockNumber('ONE_DAY')
    store.dispatch(setDailyBlock(newDailyBlock))
}

export default useDailyBlock
