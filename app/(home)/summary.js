import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


const Summary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };

  const fetchAttendanceReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://192.168.0.102:8000/api/attendance/report`,
        {
          params: {
            month: currentDate.month() + 1,
            year: currentDate.year(),
          },
        }
      );
      setAttendanceData(response.data.report);
    } catch (error) {
      console.log("Error fetching attendance:", error);
      setError("Error fetching attendance report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceReport();
  }, [currentDate]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
        }}
      >


        <Ionicons
          onPress={() => router.back()}
          name="arrow-back"
          size={24}
          color="black"
        />
        <AntDesign
          onPress={goToPrevMonth}
          name="left"
          size={24}
          color="black"
        />

        <Text>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={24}
          color="black"
        />
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View style={{ marginHorizontal: 12 }}>
          {attendanceData?.map((item, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#4b6cb7",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {item?.name?.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Text style={{ marginTop: 5, color: "black" }}>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10, margin: 5, padding: 5, borderRadius: 10, backgroundColor: '#f3e7e9' }}>
                <DataTable>
                  <DataTable.Header >
                    <DataTable.Title>Present Day </DataTable.Title>
                    <DataTable.Title>Absent Day</DataTable.Title>

                  </DataTable.Header>
                  <DataTable.Row>
                    <DataTable.Cell>{item?.present}</DataTable.Cell>
                    <DataTable.Cell>{item?.absent}</DataTable.Cell>

                  </DataTable.Row>
                </DataTable>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({});
