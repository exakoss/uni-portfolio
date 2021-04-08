// import {useDispatch} from 'react-redux';
import {store} from '../store';
import {setDailyBlock} from '../reducers/dailyBlockReducer';
import {getBlock} from '../utils';

const useDailyBlock = async () => {
    const newDailyBlock = await getBlock('ONE_DAY').then(result => result)
    store.dispatch(setDailyBlock(newDailyBlock))
}

export default useDailyBlock
