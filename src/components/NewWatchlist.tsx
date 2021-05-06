import React, {useState, useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {TokenListEntry, WatchlistEntry} from '../types';
import {useSelector, RootStateOrAny} from 'react-redux';
import TokenList from './TokenList';
import CurrentPriceHeader from './CurrentPriceHeader';
import {getTokenListEntriesFromWatchlistEntries} from '../utils/synthTools';
import LoadingScreen from './LoadingScreen';

const {height} = Dimensions.get('window')

const NewWatchlist:React.FC = () => {
    const [watchlistTokens,setWatchlistTokens] = useState<TokenListEntry[]>([])
    const watchlistEntries:WatchlistEntry[] = useSelector((state:RootStateOrAny) => state.watchlist.watchlistEntries)
    const [isLoading,setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchAndSetTokens = async () => {
            const newTokens:TokenListEntry[] = await getTokenListEntriesFromWatchlistEntries(watchlistEntries)
            setWatchlistTokens(newTokens)
        }
        setIsLoading(true)
        console.log(watchlistEntries)
        fetchAndSetTokens()
        setIsLoading(false)
    },[watchlistEntries])

    if (isLoading) return <LoadingScreen placeholder='The watchlist is loading...'/>
    return (
        <View style={{flex: 1, height:height}}>
            <CurrentPriceHeader/>
            <TokenList tokens={watchlistTokens} placeholder='Your watchlist is currently empty' isLoading={isLoading}/>
        </View>
    )
}

export default NewWatchlist
