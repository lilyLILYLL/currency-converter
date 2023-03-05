import React from "react";
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import colours from "../constants/colours";

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        color: colours.white,
    },
    reverseContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        color: colours.white,
        marginVertical: 20,
    },
    reverseLogo: {
        marginHorizontal: 15,
    },
});

export const ReverseButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.reverseContainer} onPress={onPress}>
            <Image
                source={require("../assets/images/reverse.png")}
                style={styles.reverseLogo}
            />
            <Text style={styles.text}>Reverse Currencies</Text>
        </TouchableOpacity>
    );
};
