import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colours from "../constants/colours";
const styles = StyleSheet.create({
    text: {
        marginLeft: 20,
        fontSize: 18,
        marginVertical: 15,
    },
    separator: {
        borderBottomColor: colours.border,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
   
});

export const RowItem = ({ text, onPress, icon }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.row}>
            <Text style={styles.text}>{text}</Text>
            {icon}
        </TouchableOpacity>
    );
};
export const RowSeparator = () => {
    return <View style={styles.separator}></View>;
};
