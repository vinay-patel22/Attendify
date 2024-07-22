import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient colors={["#fdfbfb", "#ebedee"]} style={{ flex: 1 }}>
        <View style={{ padding: 5 }}>
          <View
            style={{
              // flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", color: "#814242" }}>
              Attendance Management System
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              // gap: 10,
            }}
          >

            {/* Employee List */}
            <Pressable
              onPress={() => router.push("/(home)/employees")}
              style={{
                // backgroundColor: "#a8edea",
                padding: 12,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  // backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="ios-people-sharp" size={27} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Employee List
              </Text>
            </Pressable>


            {/* Mark Attendance */}
            <Pressable
              onPress={() => router.push("/(home)/markattendance")}
              style={{
                // backgroundColor: "#a8edea",
                padding: 12,
                borderRadius: 6,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  // backgroundColor: "#814242",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="ios-people-sharp" size={27} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Mark Attendance
              </Text>
            </Pressable>
          </View>

          {/* Report Main DIV */}

          <View
            style={{
              marginTop: 15,
              // backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 7,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 10, fontStyle: 'italic' }}>Reports</Text>

            {/* Attendance Report */}
            <Pressable
              onPress={() => router.push("/(home)/attendance")}
              style={{
                backgroundColor: "#c1dfc4",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="newspaper-outline" size={24} color="black" />
              </View>

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Attendance Report
              </Text>


              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>


            <Pressable
              onPress={() => router.push("/(home)/summary")}
              style={{
                backgroundColor: "#c1dfc4",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Octicons name="repo-pull" size={24} color="black" />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Summary Report
              </Text>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>



          </View>

          {/* Extra Features */}

          <Text style={{ fontSize: 20, fontWeight: '500', marginTop: 10, fontStyle: 'italic' }}>Extra Features</Text>
          <View
            style={{
              marginBottom: 10,
              // backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 20,
            }}
          >
            {/* Employee Salary Slip */}

            <Pressable
              onPress={() => router.push("/(home)/salarySlip")}
              style={{
                backgroundColor: "#FFC371",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="dollar-sign" size={24} color="black" />
              </View>

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Employee Salary Slip
              </Text>

            </Pressable>

            {/* Notification And BirthdayReminder */}
            <Pressable
              onPress={() => router.push("/(home)/BirthdayScreen")}
              style={{
                backgroundColor: "#FFC371",
                borderRadius: 6,
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  padding: 7,
                  width: 45,
                  height: 45,
                  borderRadius: 7,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="bell" size={24} color="black" />
              </View>

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: "600",
                  flex: 1,
                }}
              >
                Employee Notifications
              </Text>

            </Pressable>


          </View>


        </View>
      </LinearGradient>
    </ScrollView >
  );
};

export default index;

const styles = StyleSheet.create({});
