import React, {useEffect} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import theme from '../theme';
import SearchBar from './SearchBar';
import Constants from 'expo-constants'
import AppBar from './AppBar';
import WatchList from './WatchList';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import useETH from '../hooks/useETH';

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
    const Tab = createBottomTabNavigator();

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Search"
                    tabBarOptions={{
                        activeTintColor: '#5142c6',
                        inactiveTintColor: 'white',
                        activeBackgroundColor: theme.colors.background,
                        inactiveBackgroundColor: theme.colors.background,
                    }}
                    sceneContainerStyle={{backgroundColor: theme.colors.background}}
                >
                    <Tab.Screen
                        name="Search"
                        component={SearchBar}
                        options={{
                            tabBarLabel: 'Search',
                            tabBarIcon: ({ color, size }) => (
                                    <Ionicons name="search" color={color} size={size} sharp/>
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Watchlist"
                        component={WatchList}
                        options={{
                            tabBarLabel: 'Watchlist',
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="list" color={color} size={size} sharp/>
                            )
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default Main
