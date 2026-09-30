import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser, setLoading } from "../../store/authSlice";
import { useNavigation } from "@react-navigation/native";

const schema = yup.object({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
});

export default function RegisterScreen() {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        dispatch(setLoading(true));
        try {
            const storedUsers = await AsyncStorage.getItem('userRegister');
            let usersArray = [];
            if (storedUsers) {
                const parsed = JSON.parse(storedUsers);
                usersArray = Array.isArray(parsed) ? parsed : [parsed];
            }

            // Check if email already exists
            const existingUser = usersArray.find(
                (u) => u.email?.trim().toLowerCase() === data.email?.trim().toLowerCase()
            );

            if (existingUser) {
                Alert.alert("Already Registered", "An account with this email already exists. Please login.");
                return;
            }

            usersArray.push(data);
            await AsyncStorage.setItem('userRegister', JSON.stringify(usersArray));
            Alert.alert("Success", "Registered successfully! Please login.", [
                { text: "OK", onPress: () => navigation.navigate("Login") }
            ]);
        }
        catch (error) {
            console.log("Registration Error:", error);
            Alert.alert("Error", "Registration failed. Please try again.");
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/meezan_logo2.jpg')}
                style={styles.logo}
                resizeMode="contain"
            />
            <View style={styles.form}>
                <Text style={styles.title}>Register</Text>

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
                <TouchableOpacity style={{ alignItems: 'flex-end', margin: 10 }} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginButtonText}>Existing User? <Text style={{ color: "red" }}>Login Here</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                    {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buttonText}>Register</Text>}
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
    loginButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',

    },
});