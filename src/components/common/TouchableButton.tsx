import React from 'react'
import {TouchableOpacity, View, Text,StyleSheet} from 'react-native';
import theme from '../../theme';

interface Props {
    text: string,
    onPress: () => void
}


const styles = StyleSheet.create({
    buttonContainer: {
        margin:theme.distance.small,
        borderWidth: 2,
        padding: theme.distance.small,
        borderColor: theme.colors.textSecondary
    },
    buttonText: {
        color:theme.colors.textWhite,
        fontSize: theme.fontsize.big,
        textAlign: 'center'
    }
})

const TouchableButton:React.FC<Props> = ({text,onPress}) => {
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TouchableButton
