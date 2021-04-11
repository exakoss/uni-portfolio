import React from 'react';
import {TextInput as NativeTextInput, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../theme'

interface Props {
    error?: string | false,
    style?: any
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 1
    },
    input: {
        paddingHorizontal: theme.distance.tiny,
        backgroundColor: theme.colors.textWhite
    },
    warningBorder: {
        borderColor: theme.colors.warning
    },
    textInput: {
        height: 36,
        fontSize: 24,
    }
});

const TextInput:React.FC<Props> = ({ style, error, ...props }) => {
    const textInputStyle = [style,styles.textInput];
    const viewStyles = [
        styles.border,
        styles.input,
        error && styles.warningBorder
    ]

    return <View style={StyleSheet.flatten(viewStyles as ViewStyle)}>
        <NativeTextInput style={textInputStyle} {...props} />
    </View>;
};

export default TextInput;
