import React from 'react';
import theme from '../../theme';
import SearchBar from '../SearchBar';
import {Ionicons} from '@expo/vector-icons';
import WatchList from '../WatchList';
import PortfolioNavigator from './PortfolioNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SynthetixNavigator from './SynthetixNavigator';
import FormikSearchBar from '../FormikSearchBar';
import NewWatchlist from '../NewWatchlist';

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
            {/*<Tab.Screen*/}
            {/*    name="Search"*/}
            {/*    component={SearchBar}*/}
            {/*    options={{*/}
            {/*    tabBarLabel: 'Search',*/}
            {/*        tabBarIcon: ({ color, size }) => (*/}
            {/*        <Ionicons name="search" color={color} size={size} sharp/>*/}
            {/*        )*/}
            {/*    }}*/}
            {/*/>*/}
            <Tab.Screen
                name="FormikSearch"
                component={FormikSearchBar}
                options={{
                    tabBarLabel: 'Formik Search',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search-circle" color={color} size={size} sharp/>
                    )
                }}
            />
            {/*<Tab.Screen*/}
            {/*    name="Watchlist"*/}
            {/*    component={WatchList}*/}
            {/*    options={{*/}
            {/*        tabBarLabel: 'Watchlist',*/}
            {/*            tabBarIcon: ({ color, size }) => (*/}
            {/*            <Ionicons name="list" color={color} size={size} sharp/>*/}
            {/*            )*/}
            {/*    }}*/}
            {/*/>*/}
            <Tab.Screen
                name="NewWatchlist"
                component={NewWatchlist}
                options={{
                    tabBarLabel: 'New Watchlist',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" color={color} size={size} sharp/>
                    )
                }}
            />
            <Tab.Screen
                name="Synthetix"
                component={SynthetixNavigator}
                options={{
                    tabBarLabel: 'Trading',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cash" color={color} size={size} sharp/>
                    )
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={PortfolioNavigator}
                options={{
                    tabBarLabel: 'Portfolio',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="briefcase" color={color} size={size} sharp/>
                        )
                }}
            />
    </Tab.Navigator>
)
}

export default TabNavigator
