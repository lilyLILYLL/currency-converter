import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, View, Dimensions } from "react-native";
const styles = StyleSheet.create({
    container: {
        left: 0,
        right: 0,
        bottom: 0,
    },
});
export const KeyboardSpacer = ({ onToggle }) => {
    const [keyboardSpace, setKeyboardSpace] = useState();

    useEffect(() => {
        try {
            const screenHeight = Dimensions.get("window").height;
            const showListener = Keyboard.addListener(
                "keyboardDidShow",
                (event) => {
                    const endY = event.endCoordinates.screenY;
                    setKeyboardSpace(screenHeight - endY + 20);
                    onToggle(true);
                }
            );
            const hideListener = Keyboard.addListener("keyboardDidHide", () => {
                setKeyboardSpace(0);
                onToggle(false);
            });
            return () => {
                showListener.remove();
                hideListener.remove();
            };
        } catch (error) {
            throw error;
        }
    }, []);

    return <View style={[styles.container, { height: keyboardSpace }]} />;
};
