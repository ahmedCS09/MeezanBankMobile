import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Header({ title = "Meezan Bank" }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate("Dashboard");
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate("Login");
    };

    return (
        <View style={styles.header}>
            {/* Left Action (Back) */}
            <TouchableOpacity
                onPress={handleBack}
                style={styles.actionBtn}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <FontAwesomeIcon icon={faArrowLeft} color="white" size={18} />
            </TouchableOpacity>

            {/* Centered Title */}
            <View style={styles.titleWrapper}>
                <Text style={styles.headerTitle} numberOfLines={1}>
                    {title}
                </Text>
            </View>

            {/* Right Actions (Home & Logout) */}
            <View style={styles.rightActions}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Dashboard")}
                    style={styles.actionBtn}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <FontAwesomeIcon icon={faHouse} color="white" size={18} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.actionBtn}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} color="white" size={18} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: "#5C246E",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        paddingTop: 30
    },
    actionBtn: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },
    titleWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        letterSpacing: 0.3,
        paddingLeft: 25
    },
    rightActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
});
