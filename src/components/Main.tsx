import React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../theme';
import Constants from 'expo-constants'
import { NavigationContainer} from '@react-navigation/native';
import useETH from '../hooks/useETH';
import StackNavigator from './navigation/StackNavigator';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.background,
        paddingTop: Constants.statusBarHeight,
    },
});

const Main:React.FC = () => {
    //Fetching and pushing ETH price to the state on start up
    useETH()

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <StackNavigator/>
            </NavigationContainer>
        </View>
    )
}

export default Main
