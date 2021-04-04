import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import theme from '../theme';
import loading from '../../assets/loading-transparent.gif'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gif: {
        width: 160,
        height: 160
    },
    loadingText: {
        color:theme.colors.textWhite,
        fontSize:theme.fontsize.large
    }
})

const LoadingScreen:React.FC<{placeholder:string}> = ({placeholder}) => {
    return(
        <View style={styles.container}>
            <Image source={loading} style={styles.gif}/>
            <Text style={styles.loadingText}>{placeholder}</Text>
        </View>
    )
}

export default LoadingScreen
