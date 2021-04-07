import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '../theme';
import Constants from 'expo-constants'
import { NavigationContainer} from '@react-navigation/native';
import useETH from '../hooks/useETH';
import useSNX from '../hooks/useSNX';
import StackNavigator from './navigation/StackNavigator';
import useDailyBlock from '../hooks/useDailyBlock';
import 'react-native-get-random-values'

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.background,
        paddingTop: Constants.statusBarHeight,
    },
});

const Main:React.FC = () => {
    useEffect(() => {
        const updateData = async() => {
            //Fetching and pushing ETH price to the state on start up
            await useETH()
            //Same thing with SNX, rebuild into a single separate hook later
            await useSNX()
            await useDailyBlock()
        }
        updateData().then()
    },[])

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <StackNavigator/>
            </NavigationContainer>
        </View>
    )
}

export default Main
