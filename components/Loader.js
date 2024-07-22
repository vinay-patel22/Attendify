import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

const Loader = ({ message, logo }) => {
    return (
        <View style={styles.container}>
            {logo && <Image source={logo} style={styles.logo} />}
            <ActivityIndicator size="large" color="#0000ff" />
            {message && <Text style={styles.message}>{message}</Text>}
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
        width: 350, // Adjust the width as needed
        height: 250, // Adjust the height as needed
        marginBottom: 20, // Adjust the space between logo and loader
    },
    message: {
        marginLeft: 10, // Adjust the gap between loader and message
        fontSize: 20,
        color: '#814242',
    },
});

export default Loader;
