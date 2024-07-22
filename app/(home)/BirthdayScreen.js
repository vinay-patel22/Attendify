import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const Birthdays = () => {
    const [todayBirthdays, setTodayBirthdays] = useState([]);
    const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchBirthdays = async () => {
            try {
                const [todayResponse, upcomingResponse] = await Promise.all([
                    axios.get('http://192.168.0.102:8000/api/birthdays/today'),
                    axios.get('http://192.168.0.102:8000/api/birthdays/upcoming')
                ]);

                setTodayBirthdays(todayResponse.data);
                setUpcomingBirthdays(upcomingResponse.data);
            } catch (err) {
                setError('Failed to fetch birthdays.');
                console.error('Error fetching birthdays:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBirthdays();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
    if (error) return <Text style={styles.error}>{error}</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Ionicons
                onPress={() => router.back()}
                name="arrow-back"
                size={24}
                color="black"
            />
            <Text style={styles.title}>Today's Birthdays</Text>
            {todayBirthdays.length > 0 ? (
                todayBirthdays.map(birthday => (
                    <View key={birthday._id} style={styles.birthdayItem}>
                        <Text style={styles.text}>{birthday.employeeName}</Text>
                        <Text style={styles.text}>Date of Birth: {birthday.dateOfBirth}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noData}>No birthdays today.</Text>
            )}

            <Text style={styles.title}>Upcoming Birthdays</Text>
            {upcomingBirthdays.length > 0 ? (
                upcomingBirthdays.map(birthday => (
                    <View key={birthday._id} style={styles.birthdayItem}>
                        <Text style={styles.text}>Employee Name : {birthday.employeeName}</Text>
                        <Text style={styles.text}>Date of Birth: {birthday.dateOfBirth}</Text>
                        <Text style={styles.text}>Days to Birthday: {birthday.daysToBirthday}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.noData}>No upcoming birthdays in the next 30 days.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    birthdayItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    loader: {
        marginVertical: 20,
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    noData: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default Birthdays;
