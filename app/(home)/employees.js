import { Pressable, StyleSheet, Text, View, TextInput, Modal, Button, ScrollView, Alert } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import SearchResults from "../../components/SearchResults";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null); // State for managing editing
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const router = useRouter();

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get("http://192.168.0.102:8000/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.log("Error fetching employee data", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchEmployeeData();
    }, [])
  );

  const handleDelete = (employeeId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this employee?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.0.102:8000/api/employees/${employeeId}`);
              setEmployees(employees.filter(emp => emp._id !== employeeId));
            } catch (error) {
              console.log("Error deleting employee", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = (employee) => {
    setEditingEmployee({ ...employee }); // Copy employee data to avoid direct mutation
    setModalVisible(true); // Show the modal
  };

  const saveEdit = async () => {
    if (!editingEmployee) return;
    try {
      await axios.put(`http://192.168.0.102:8000/api/employees/${editingEmployee._id}`, {
        employeeName: editingEmployee.employeeName,
        designation: editingEmployee.designation,
        employeeId: editingEmployee.employeeId,
        joiningDate: editingEmployee.joiningDate,
        dateOfBirth: editingEmployee.dateOfBirth,
        salary: editingEmployee.salary,
        activeEmployee: editingEmployee.activeEmployee,
        phoneNumber: editingEmployee.phoneNumber,
        address: editingEmployee.address,
      });
      // Update the employee list with the edited employee
      setEmployees(employees.map(emp => (emp._id === editingEmployee._id ? editingEmployee : emp)));
      setModalVisible(false); // Hide the modal
      Alert.alert("Success", "Changes have been saved successfully."); // Show success message
    } catch (error) {
      console.log("Error updating employee data", error);
    }
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => router.back()}
          style={styles.icon}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable style={styles.searchContainer}>
          <AntDesign style={styles.searchIcon} name="search1" size={20} color="black" />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={styles.searchInput}
            placeholder="Search"
          />
        </Pressable>
        {/* Always show the "+" button */}
        <Pressable style={styles.addButton} onPress={() => router.push("/(home)/adddetails")}>
          <AntDesign name="pluscircle" size={30} color="#0072b1" />
        </Pressable>
      </View>
      {employees.length > 0 ? (
        <SearchResults data={employees} input={input} setInput={setInput} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <View style={styles.noDataContainer}>
          <Text>No Data</Text>
          <Text>Press on the plus button and add your Employee</Text>
        </View>
      )}

      {/* Modal for editing employee */}
      {editingEmployee && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Employee</Text>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Employee Name:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingEmployee.employeeName}
                  onChangeText={(text) => setEditingEmployee({ ...editingEmployee, employeeName: text })}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Designation:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingEmployee.designation}
                  onChangeText={(text) => setEditingEmployee({ ...editingEmployee, designation: text })}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Employee ID:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingEmployee.employeeId}
                  onChangeText={(text) => setEditingEmployee({ ...editingEmployee, employeeId: text })}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Joining Date:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingEmployee.joiningDate}
                  onChangeText={(text) => setEditingEmployee({ ...editingEmployee, joiningDate: text })}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Date of Birth:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingEmployee.dateOfBirth}
                  onChangeText={(text) => setEditingEmployee({ ...editingEmployee, dateOfBirth: text })}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Salary:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingEmployee.salary !== undefined ? editingEmployee.salary.toString() : ''}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    // Convert text to a valid number
                    const numericValue = text ? parseFloat(text) : 0;
                    setEditingEmployee({ ...editingEmployee, salary: numericValue });
                  }}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Phone Number:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingEmployee.phoneNumber}
                  onChangeText={(text) => setEditingEmployee({ ...editingEmployee, phoneNumber: text })}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Address:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingEmployee.address}
                  onChangeText={(text) => setEditingEmployee({ ...editingEmployee, address: text })}
                />
              </View>
              <View style={styles.modalField}>
                <Text style={styles.modalLabel}>Active Employee:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editingEmployee.activeEmployee !== undefined ? editingEmployee.activeEmployee.toString() : ''}
                  onChangeText={(text) => setEditingEmployee({ ...editingEmployee, activeEmployee: text === 'true' })}
                />
              </View>
              <Button title="Save Changes" onPress={saveEdit} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 40,
    flex: 1,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalField: {
    marginBottom: 15,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

export default Employees;
