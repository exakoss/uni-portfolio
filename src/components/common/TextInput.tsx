import React from 'react';
import {TextInput as NativeTextInput, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../theme'

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
    }
});

const TextInput:React.FC<{error?:string,style?:any}> = ({ style, error, ...props }) => {
    const textInputStyle = [style];
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
