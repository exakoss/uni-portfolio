import React, {useEffect} from 'react'
import {View, StyleSheet, ScrollView, Text} from 'react-native'
import theme from '../theme';
import SearchBar from './SearchBar';
import Constants from 'expo-constants'
import {Route, Switch, useHistory} from 'react-router-native'
import AppBar from './AppBar';
import WatchList from './WatchList';
import {useQuery} from '@apollo/client';
import {ETH_PRICE_QUERY} from '../graphql/queries';
import {useDispatch} from 'react-redux';
import {setETHPrice} from '../reducers/ethPriceReducer';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.background,
        paddingTop: Constants.statusBarHeight,
    },
});

const Main:React.FC = () => {
    const dispatch = useDispatch()
    const {loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
    if (ethLoading) return <View><Text>Loading</Text></View>
    const ethPriceInUsd:number = Number(parseFloat(ethPriceData.bundles[0].ethPrice).toFixed(2))
    useEffect(() => {
        dispatch(setETHPrice(ethPriceInUsd))
    },[])
    return (
        <View style={styles.container}>
            <ScrollView>
                <Switch>
                    <Route path='/' exact>
                        <SearchBar/>
                    </Route>
                    <Route path='/watchlist'>
                        <WatchList/>
                    </Route>
                </Switch>
            </ScrollView>
            <View>
                <AppBar/>
            </View>
        </View>
    )
}

export default Main
