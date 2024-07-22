import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const SalarySlip = () => {
    const router = useRouter();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [salarySlips, setSalarySlips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noData, setNoData] = useState(false); // Track if no data is available

    const handleGenerateSlips = async () => {
        setLoading(true);
        setError(null);
        setNoData(false); // Reset noData flag

        try {
            const response = await axios.get('http://192.168.0.102:8000/api/salary-slips', {
                params: { month, year }
            });

            if (response.data.length === 0) {
                setNoData(true); // Set noData flag if no slips are found
                setSalarySlips([]); // Clear previous results
            } else {
                setSalarySlips(response.data);
            }
        } catch (err) {
            setError('Failed to generate salary slips.');
            console.error('Error fetching salary slips:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Ionicons
                onPress={() => router.back()}
                name="arrow-back"
                size={24}
                color="black"
            />
            <Text style={styles.title}>Generate Employee Salary Slips</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Month (1-12)"
                    keyboardType="numeric"
                    value={month}
                    onChangeText={setMonth}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Year (e.g., 2024)"
                    keyboardType="numeric"
                    value={year}
                    onChangeText={setYear}
                />

                <Pressable style={styles.button} onPress={handleGenerateSlips}>
                    <Text style={styles.buttonText}>Generate Salary Slips</Text>
                </Pressable>
            </View>

            {loading && <ActivityIndicator size="large" color="#007bff" style={styles.loader} />}
            {error && <Text style={styles.error}>{error}</Text>}
            {noData && !loading && <Text style={styles.noData}>No data available for the selected month and year.</Text>}

            <View style={styles.results}>
                {salarySlips.map((slip) => (
                    <View key={slip.employeeId} style={styles.slip}>
                        <Text style={styles.text}>Employee ID: {slip.employeeId}</Text>
                        <Text style={styles.text}>Name: {slip.employeeName}</Text>
                        <Text style={styles.text}>Designation: {slip.designation}</Text>
                        <Text style={styles.text}>Gross Salary: ${slip.salary.basicSalary.toFixed(2)}</Text>
                        <Text style={styles.text}>Deductions: ${slip.salary.deductions.toFixed(2)}</Text>
                        <Text style={styles.text}>Net Salary: ${slip.salary.netSalary.toFixed(2)}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center'
    },
    form: {
        marginBottom: 20
    },
    input: {
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10
    },
    noData: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20
    },
    results: {
        marginTop: 20
    },
    slip: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333'
    },
    loader: {
        marginVertical: 20
    }
});

export default SalarySlip;
