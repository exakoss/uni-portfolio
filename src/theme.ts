import {StyleSheet} from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textWhite: 'white',
        primary: '#0366d6',
        background: '#333333',
        warning: '#d73a4a',
        mainBackground: '#e1e4e8',
        green: '#46c41b',
        darkBrown: '#140d07'
    },
    fontWeights: {
        normal: 400,
        bold: 700,
    },
    distance: {
        normal: 15,
        small: 10,
        tiny: 5
    },
    fontsize: {
        small: 15,
        normal : 20,
        big: 25,
        large: 30
    }
}

export const commonStyles = StyleSheet.create({
    tile:{
        backgroundColor: theme.colors.background,
            display: 'flex',
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
    },
    tileText: {
        color: theme.colors.textWhite,
        fontSize: theme.fontsize.normal
    },
    nameText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontsize.small,
    },
    positivePercentage: {
        color: theme.colors.green,
        fontSize: theme.fontsize.normal
    },
    negativePercentage: {
        color: theme.colors.warning,
        fontSize: theme.fontsize.normal
    },
    nameContainer: {
        display: "flex",
        flexDirection:"column"
    },
    placeholder: {
        color: theme.colors.textWhite,
        fontSize: theme.fontsize.big,
        textAlign: "center"
    }
})

export default theme
