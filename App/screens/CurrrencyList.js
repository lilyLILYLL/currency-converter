import React, { useContext } from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import currencies from "../data/currencies.json";
import { RowItem } from "../components/RowItem";
import { RowSeparator } from "../components/RowItem";
import { CurrencyStates } from "../util/CurrencyStates";
import { Entypo } from "@expo/vector-icons";
import colours from "../constants/colours";
const styles = StyleSheet.create({
    icon: {
        color: colours.blue,
        marginHorizontal: 20,
        marginVertical: 15,
    },
    container: {
        backgroundColor: colours.white,
    },
});

export const CurrencyList = ({ navigation, route }) => {
    const { baseCurrency, quoteCurrency, setBaseCurrency, setQuoteCurrency } =
        useContext(CurrencyStates);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={currencies}
                renderItem={({ item }) => {
                    const isBaseCurrency = route.params.isBaseCurrency;
                    let selected = false;
                    if (isBaseCurrency && item === baseCurrency) {
                        selected = true;
                    } else if (!isBaseCurrency && item === quoteCurrency) {
                        selected = true;
                    }

                    return (
                        <RowItem
                            text={item}
                            onPress={() => {
                                if (isBaseCurrency) {
                                    setBaseCurrency(item);
                                } else {
                                    setQuoteCurrency(item);
                                }

                                navigation.pop();
                            }}
                            icon={
                                selected && (
                                    <Entypo
                                        name="check"
                                        size={20}
                                        style={styles.icon}
                                    />
                                )
                            }
                        />
                    );
                }}
                keyExtractor={(item) => item}
                ItemSeparatorComponent={() => <RowSeparator />}
            />
        </SafeAreaView>
    );
};
