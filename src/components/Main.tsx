import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import theme from '../theme';
import SearchBar from './SearchBar';
import Constants from 'expo-constants'
import {Route, Switch, useHistory} from 'react-router-native'
import AppBar from './AppBar';
import WatchList from './WatchList';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.background,
        paddingTop: Constants.statusBarHeight,
    },
});

const Main:React.FC = () => {
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
