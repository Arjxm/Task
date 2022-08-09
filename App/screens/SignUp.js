import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import {useState} from "react";
import axios from "axios";

function SignUp({navigation}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handelSubmit = async (e) => {
        e.preventDefault()
        console.log(name, password, email)
        try {
            const response = await axios.post("https://todo-app-rn.herokuapp.com/api/user/", {
                name, email, password
            })
            if (response.status === 201) {
                navigation.navigate("dashboard", {name: "dashboard"})
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (<View style={styles.container}>
            <Text style={styles.logo}>Sign up</Text>
            <View style={styles.inputView}>
                <TextInput
                    defaultValue={name}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                    style={styles.inputText}
                    placeholder="Name..."
                    placeholderTextColor="#003f5c"
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    defaultValue={email}
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    defaultValue={password}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                />
            </View>
            <TouchableOpacity style={styles.loginBtn}>
                <Text onPress={handelSubmit} style={styles.loginText}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text onPress={() => {
                    navigation.navigate("signin", {name: "signin"})
                }} style={styles.loginText}>Already have an account? sign in</Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131313',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "normal",
        fontSize: 50,
        color: "#fdfdfd",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#171717",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#208bff",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    }
});

export default SignUp;
