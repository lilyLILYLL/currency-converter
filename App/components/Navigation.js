import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { Options } from "../screens/Options";
import { CurrencyList } from "../screens/CurrrencyList";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colours from "../constants/colours";
import { CurrencyStateProvider } from "../util/CurrencyStates";

const styles = StyleSheet.create({
    icon: {
        marginHorizontal: 10,
    },
});
const MainStack = createStackNavigator();
// MainStack.Navigator => this is a parent compents, which is used to wrap screens
// MainStack.Screen => a child component

const MainStackScreen = () => {
    return (
        <MainStack.Navigator
            initialRouteName="Home"
            // screenOptions={{ presentation: "modal" }} // presents a screen navigating from the bottom to the top
        >
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <MainStack.Screen name="Options" component={Options} />
        </MainStack.Navigator>
    );
};
const ModalStack = createStackNavigator();
const ModalStackScreen = () => {
    return (
        <ModalStack.Navigator screenOptions={{ presentation: "modal" }}>
            <ModalStack.Screen
                name="Main"
                component={MainStackScreen}
                options={{ headerShown: false }}
            />
            <ModalStack.Screen
                name="CurrencyList"
                component={CurrencyList}
                options={({ navigation, route }) => ({
                    title: route.params && route.params.title,
                    headerLeft: null,
                    headerRight: () => {
                        return (
                            <TouchableOpacity style={styles.icon}>
                                <Entypo
                                    name="cross"
                                    size={30}
                                    color={colours.blue}
                                    onPress={() => {
                                        navigation.pop();
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    },
                })}
            />
        </ModalStack.Navigator>
    );
};
export const Navigation = () => {
    return (
        <NavigationContainer>
            <CurrencyStateProvider>
                <ModalStackScreen />
            </CurrencyStateProvider>
        </NavigationContainer>
    );
};
