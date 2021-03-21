import {useDispatch} from 'react-redux';
import {setDailyBlock} from '../reducers/dailyBlockReducer';
import {getBlock} from '../utils';

const useDailyBlock = async () => {
    const dispatch = useDispatch()
    const newDailyBlock = await getBlock('ONE_DAY').then(result => result)
    dispatch(setDailyBlock(newDailyBlock))
}

export default useDailyBlock
