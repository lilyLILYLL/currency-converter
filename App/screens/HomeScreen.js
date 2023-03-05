import React, { useState, useContext } from "react";
import { CurrencyStates } from "../util/CurrencyStates";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    StatusBar,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";

import colours from "../constants/colours";
import { InputConversion } from "../components/InputConversion";
import { ReverseButton } from "../components/ReverseButton";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardSpacer } from "../components/KeyboardSpacer";

const screen = Dimensions.get("window");

export const HomeScreen = ({ navigation }) => {
    const [keyboardEnabled, setKeyboardEnabled] = useState(false);
    const {
        baseCurrency,
        quoteCurrency,
        rates,
        date,
        baseValue,
        quoteValue,
        swapCurrencies,
        calculateQuoteValue,
        isLoading,
    } = useContext(CurrencyStates);

    return (
        <ScrollView style={styles.container}>
            {/* i need to wrap a icon in a container, and make sure it is touchable */}
            <SafeAreaView style={styles.icon}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.push("Options");
                    }}
                >
                    <Entypo name="cog" size={32} color={colours.white} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* we need to wrap 2 images into a view: logoContainer */}
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logoBackground}
                    source={require("../assets/images/background.png")}
                    resizeMode="contain"
                />
                <Image
                    style={styles.logo}
                    source={require("../assets/images/logo.png")}
                    resizeMode="contain"
                />
            </View>
            <View>
                <Text style={styles.textHeader}>Currency Converter</Text>
                {isLoading ? (
                    <ActivityIndicator size={"large"} color={colours.white} />
                ) : (
                    <>
                        <InputConversion
                            text={baseCurrency}
                            value={baseValue == 0 ? "" : baseValue.toString()}
                            onButtonPress={() =>
                                navigation.push("CurrencyList", {
                                    title: "Base Currency",
                                    isBaseCurrency: true,
                                })
                            }
                            onChangeText={(text) => {
                                calculateQuoteValue(text);
                            }}
                        />
                        <InputConversion
                            text={quoteCurrency}
                            value={quoteValue.toString()}
                            onButtonPress={() =>
                                navigation.push("CurrencyList", {
                                    title: "Quote Currency",
                                    isBaseCurrency: false,
                                })
                            }
                            editable={false}
                            thousandSeparator={true}
                        />
                        <Text style={styles.inforLine}>
                            {` 1 ${baseCurrency} = ${rates[quoteCurrency]} ${quoteCurrency} as of ${date}`}
                        </Text>
                        <ReverseButton onPress={swapCurrencies} />
                    </>
                )}
            </View>

            <StatusBar style="auto" />
            <KeyboardSpacer
                onToggle={(keyboardEnabled) => {
                    setKeyboardEnabled(keyboardEnabled);
                }}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.blue,
    },
    logoContainer: {
        // both for align centains which are within a container
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },
    logoBackground: {
        width: screen.width / 0.45,
        height: screen.width * 0.45,
    },
    logo: {
        position: "absolute",
        width: screen.width * 0.25,
        height: screen.width * 0.25,
    },
    textHeader: {
        color: colours.white,
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: colours.white,
    },
    inputContainer: {
        marginBottom: 10,
        backgroundColor: "red",
    },

    reverseLogo: {
        marginHorizontal: 15,
    },
    inforLine: {
        textAlign: "center", // align content for text
        fontSize: 14,
        color: colours.white,
    },
    icon: {
        alignItems: "flex-end",
        marginHorizontal: 20,
        marginVertical: 20,
    },
});
