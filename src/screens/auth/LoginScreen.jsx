import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser, setLoading } from "../../store/authSlice";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const schema = yup.object({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
});

export default function LoginScreen() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
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
                            setValue("email", userObj.email || "");
                            setValue("password", userObj.password || "");
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
            };
            getRememberMe();
        }, [setValue])
    );

    const onSubmit = async (data) => {
        dispatch(setLoading(true));
        try {
            const storedUsers = await AsyncStorage.getItem('userRegister');
            
            if (storedUsers) {
                const parsed = JSON.parse(storedUsers);
                const usersArray = Array.isArray(parsed) ? parsed : [parsed];
                
                const matchedUser = usersArray.find(
                    (u) => u.email?.trim().toLowerCase() === data.email?.trim().toLowerCase() && u.password === data.password
                );

                if (matchedUser) {
                    await AsyncStorage.setItem('user', JSON.stringify(data));
                    if (rememberMe) {
                        await AsyncStorage.setItem('rememberMe', JSON.stringify(true));
                    }
                    dispatch(setUser(data));
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Dashboard" }],
                    });
                } else {
                    Alert.alert("Login Failed", "Invalid email or password");
                }
            } else {
                Alert.alert("Not Registered", "No registered users found. Please register first.");
            }
        }
        catch (error) {
            console.log("Login Error:", error);
            Alert.alert("Error", "Something went wrong during login");
        }
        finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/meezan_logo2.jpg')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.form}>
                <Text style={styles.title}>Login</Text>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Email"
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

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <TextInput
                                placeholder="Password"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={styles.input}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeContainer}>
                                <Image source={showPassword ? require('../../assets/closeEyeIcon.png') : require('../../assets/openEyeIcon.png')} style={styles.eye} />
                            </TouchableOpacity>
                        </>
                    )}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
<View style={{display: "flex", justifyContent: "space-between", flexDirection: "row"}}>
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
                    <Text style={styles.registerButtonText}>New User? <Text style={{color: "red"}}>Register Here</Text></Text>
                </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                    {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonText}>Login</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
    },
    logo: {
        marginBottom: 20,
        position: 'relative'
    },
    form: {
        position: 'absolute',
        top: '60%',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#7000c5',
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    button: {
        backgroundColor: "#7000c5",
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignSelf: 'center'
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        fontWeight: 'bold',
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#7000c5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: '#7000c5',
    },
    checkmark: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 14,
    },
    rememberMe: {
        color: "#7000c5",
        fontWeight: 'bold',
        fontSize: 14,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 8,
    },
    eyeContainer: {
        position: 'absolute',
        right: 40,
        top: 110
    },
    eye: {
        width: 20,
        height: 20,
    },
    registerButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});