import React from 'react';
import theme from '../../theme';
import SearchBar from '../SearchBar';
import {Ionicons} from '@expo/vector-icons';
import WatchList from '../WatchList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TabNavigator:React.FC = () => {
    const Tab = createBottomTabNavigator();
    return (
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
)
}

export default TabNavigator
