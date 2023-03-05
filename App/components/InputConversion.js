import React from "react";
import colours from "../constants/colours";
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
} from "react-native";

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: colours.white,
        marginHorizontal: 20,
        marginVertical: 10,

        borderRadius: 5,
        borderWidth: 1,
        flexDirection: "row",
        borderColor: colours.border,
    },
    containerDisabled: {
        backgroundColor: colours.offWhite,
    },
    button: {
        backgroundColor: colours.offWhite,
        padding: 15,
        borderRightWidth: 1,
        borderColor: colours.border,
        width: 80,
    },

    buttonText: {
        fontWeight: "bold",
        fontSize: 20,
        color: colours.blue,
    },

    inputText: {
        flex: 1, // space of the text fills all the container (exclusive the button) (it's kinda similar to the width of the input text)
        padding: 10,
        fontSize: 16,
        color: colours.textLight,
    },
});

export const InputConversion = ({
    text,
    onButtonPress,
    value,
    editable,
    thousandSeparator,
    onChangeText,
}) => {
    let containerStyles = styles.inputContainer;
    if (editable === false) {
        containerStyles = [containerStyles, styles.containerDisabled];
    }

    return (
        <View style={containerStyles}>
            <TouchableOpacity style={styles.button} onPress={onButtonPress}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.inputText}
                value={value}
                keyboardType="numeric"
                editable={editable}
                thousandSeparator={thousandSeparator}
                onChangeText={onChangeText}
            />
        </View>
    );
};
