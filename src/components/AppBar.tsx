import React from 'react'
import theme from '../theme';
import {View, Text, StyleSheet} from 'react-native';
import { Link } from 'react-router-native'
import { Ionicons } from '@expo/vector-icons'

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        margin: theme.distance.normal,
        color: theme.colors.textWhite
    }
})

const AppBar:React.FC = () => {
    return (
        <View style={styles.container}>
            <Link to='/'>
                <Ionicons name="search" color='grey' size={36}/>
            </Link>
            <Link to='/watchlist'>
                <Ionicons name="list" color='grey' size={36}/>
            </Link>
            <Link to='/portfolio'>
                <Ionicons name="briefcase" color='grey' size={36}/>
            </Link>
        </View>
    )
}

export default AppBar
