import React from 'react'
import {View, StyleSheet} from 'react-native'
import theme from '../theme';
import SearchBar from './SearchBar';
import Constants from 'expo-constants'

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.mainBackground,
        marginTop: Constants.statusBarHeight
    },
});

const Main:React.FC = () => {
    return (
        <View style={styles.container}>
            <SearchBar/>
        </View>
    )
}

export default Main
