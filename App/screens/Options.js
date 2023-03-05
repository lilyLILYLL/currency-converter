import React from "react";
import { RowItem, RowSeparator } from "../components/RowItem";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import colours from "../constants/colours";
import currencies from "../data/currencies.json";
const styles = StyleSheet.create({
    container: {
        backgroundColor: colours.white,

        //justifyContent: "center", // justify content in the vertically middle
        // alignItems: "center", // justify content in the horizontally middle
    },
});
export const Options = ({ navigation }) => {
    return (
        <SafeAreaView>
            <RowItem text="Settings" />
            <RowSeparator />
            <RowItem text="Log out" />
        </SafeAreaView>
    );
};
