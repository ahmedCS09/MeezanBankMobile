import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser, setLoading } from "../../store/authSlice";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const schema = yup.object({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
});

const DEMO_USER = {
    email: "demo@meezanbank.com",
    name: "Meezan Demo User",
    accountNumber: "PK72MEZN0001234567890123",
    balance: 148500,
};

export default function LoginScreen() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "demo@meezanbank.com",
            password: "password123",
        },
    });

    useFocusEffect(
        useCallback(() => {
            const getRememberMe = async () => {
                try {
                    const rememberMeVal = await AsyncStorage.getItem('rememberMe');
                    if (rememberMeVal) {
                        setRememberMe(true);
                        const user = await AsyncStorage.getItem('user');
                        if (user) {
                            const userObj = JSON.parse(user);
                            setValue("email", userObj.email || "demo@meezanbank.com");
                            setValue("password", userObj.password || "password123");
                        }
                    }
                } catch (error) {
                    console.log("Error loading saved credentials:", error);
                }
            };
            getRememberMe();
        }, [setValue])
    );

    const performLogin = async (userData) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            if (rememberMe) {
                await AsyncStorage.setItem('rememberMe', JSON.stringify(true));
            }
            dispatch(setUser(userData));
            navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }],
            });
        } catch (err) {
            console.log("Session store error:", err);
        }
    };

    const onSubmit = async (data) => {
        dispatch(setLoading(true));
        try {
            const storedUsers = await AsyncStorage.getItem('userRegister');
            let matchedUser = null;

            if (storedUsers) {
                const parsed = JSON.parse(storedUsers);
                const usersArray = Array.isArray(parsed) ? parsed : [parsed];
                matchedUser = usersArray.find(
                    (u) => u.email?.trim().toLowerCase() === data.email?.trim().toLowerCase() && u.password === data.password
                );
            }

            // Allow built-in demo credentials or registered user
            if (matchedUser || data.email?.trim().toLowerCase() === "demo@meezanbank.com" || !storedUsers) {
                const activeUserData = matchedUser || {
                    ...DEMO_USER,
                    email: data.email,
                };
                await performLogin(activeUserData);
            } else {
                Alert.alert("Login Failed", "Invalid email or password. You can also tap 'Quick Demo Login' below to test immediately.");
            }
        } catch (error) {
            console.log("Login Error:", error);
            Alert.alert("Error", "Something went wrong during login");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDemoLogin = async () => {
        dispatch(setLoading(true));
        try {
            await performLogin(DEMO_USER);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/meezan_logo2.jpg')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.tagline}>The Premier Islamic Bank</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Sign In</Text>

                    <Text style={styles.label}>Email Address</Text>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Enter your email"
                                placeholderTextColor="#888888"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                style={styles.input}
                            />
                        )}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

                    <Text style={styles.label}>Password</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.passwordWrapper}>
                                <TextInput
                                    placeholder="Enter your password"
                                    placeholderTextColor="#888888"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    style={styles.passwordInput}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={styles.eyeBtn}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Image
                                        source={showPassword ? require('../../assets/closeEyeIcon.png') : require('../../assets/openEyeIcon.png')}
                                        style={styles.eyeIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

                    <View style={styles.optionsRow}>
                        <TouchableOpacity
                            style={styles.rememberMeContainer}
                            activeOpacity={0.7}
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                            </View>
                            <Text style={styles.rememberMe}>Remember Me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={styles.registerButtonText}>
                                New User? <Text style={{ color: "#7000c5", fontWeight: "bold" }}>Register</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleDemoLogin}
                        style={styles.demoButton}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.demoButtonText}>⚡ Quick Demo Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        backgroundColor: "#f7f7fc",
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
    },
    logo: {
        width: 220,
        height: 70,
    },
    tagline: {
        fontSize: 13,
        color: "#666",
        marginTop: 4,
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: "#7000c5",
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#444",
        marginBottom: 6,
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#d1d5db",
        borderWidth: 1.5,
        marginBottom: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        fontSize: 15,
        color: "#111827",
        backgroundColor: "#ffffff",
    },
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 48,
        borderColor: "#d1d5db",
        borderWidth: 1.5,
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 14,
        backgroundColor: "#ffffff",
    },
    passwordInput: {
        flex: 1,
        height: "100%",
        fontSize: 15,
        color: "#111827",
    },
    eyeBtn: {
        padding: 6,
        marginLeft: 8,
    },
    eyeIcon: {
        width: 22,
        height: 22,
        tintColor: "#7000c5",
    },
    optionsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 8,
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#7000c5",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        backgroundColor: "#fff",
    },
    checkboxChecked: {
        backgroundColor: "#7000c5",
    },
    checkmark: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "bold",
        lineHeight: 13,
    },
    rememberMe: {
        color: "#4b5563",
        fontSize: 13,
        fontWeight: "500",
    },
    errorText: {
        color: "#dc2626",
        fontSize: 12,
        marginTop: -6,
        marginBottom: 8,
    },
    button: {
        backgroundColor: "#7000c5",
        paddingVertical: 14,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 16,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    demoButton: {
        backgroundColor: "#f3e8ff",
        borderWidth: 1.5,
        borderColor: "#d8b4fe",
        paddingVertical: 12,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    demoButtonText: {
        color: "#7000c5",
        fontSize: 14,
        fontWeight: "bold",
    },
    registerButtonText: {
        fontSize: 13,
        color: "#6b7280",
    },
});