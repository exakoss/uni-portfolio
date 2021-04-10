import React from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import theme from '../../theme';

const styles = StyleSheet.create({
    errorText: {
        marginTop: theme.distance.tiny,
        marginLeft: theme.distance.tiny,
        color: theme.colors.warning
    }
});

const FormikTextInput:React.FC<{name:string, placeholder:string, addOnChange?: (text:string) => void}> = ({ name,placeholder,addOnChange, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;


    return (
        <View style={{marginBottom: theme.distance.tiny, marginHorizontal: theme.distance.tiny}}>
            <TextInput
                //@ts-ignore
                onChangeText={(value:string) => {
                    helpers.setValue(value)
                    if (addOnChange) {
                        addOnChange(value)
                    }
                }}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                placeholder = {placeholder}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </View>
    );
};

export default FormikTextInput;
