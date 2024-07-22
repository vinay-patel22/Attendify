import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Loader from '../../components/Loader'; // Adjust the import path based on your folder structure

const WelcomeScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay before showing the content
        const timer = setTimeout(() => {
            setLoading(false); // Stop loading after 2 seconds
        }, 4000); // Adjust delay as needed

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <Loader
                    message="Prepare For You !"
                    logo={require('../../assets/Ini_logo.png')} // Pass the logo image here
                />
            ) : (
                <>
                    <Image
                        source={require('./logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Welcome to Attendify</Text>
                    <Pressable style={styles.button} onPress={() => router.push("/(home)")}>
                        <Text style={styles.buttonText}>Get Started</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
    },
    logo: {
        width: 250,
        height: 250,
        // marginBottom: 10, // Adjust margin to position logo above the loader
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#814242',
    },
    button: {
        backgroundColor: '#814242',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default WelcomeScreen;
