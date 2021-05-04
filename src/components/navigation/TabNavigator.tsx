import React from 'react';
import theme from '../../theme';
import {Ionicons} from '@expo/vector-icons';
import PortfolioNavigator from './PortfolioNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SynthetixNavigator from './SynthetixNavigator';
import FormikSearchBar from '../FormikSearchBar';
import NewWatchlist from '../NewWatchlist';
import SampleChart from '../temporary/SampleChart';

const TabNavigator:React.FC = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName="FormikSearch"
            tabBarOptions={{
                activeTintColor: '#5142c6',
                inactiveTintColor: 'white',
                activeBackgroundColor: theme.colors.background,
                inactiveBackgroundColor: theme.colors.background,
            }}
            sceneContainerStyle={{backgroundColor: theme.colors.background}}
        >
            <Tab.Screen
                name="FormikSearch"
                component={FormikSearchBar}
                options={{
                    tabBarLabel: 'Search',
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
                    tabBarLabel: 'Watchlist',
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
            <Tab.Screen
                name="Chart"
                component={SampleChart}
                options={{
                    tabBarLabel: 'Sample chart',
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bar-chart" color={color} size={size} sharp/>
                        )
                }}
            />
    </Tab.Navigator>
)
}

export default TabNavigator
