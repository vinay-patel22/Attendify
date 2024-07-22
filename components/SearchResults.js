import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";


const SearchResults = ({ data, input, setInput, onEdit, onDelete }) => {
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item?.employeeName.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View
                style={{ marginVertical: 10, gap: 10, flexDirection: "row", alignItems: "center" }}
              >
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
                  <Text style={{ color: "white", fontSize: 16 }}>{item?.employeeName?.charAt(0)}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item?.employeeName}</Text>
                  <Text style={{ marginTop: 5, color: "gray" }}>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </View>

                <Pressable onPress={() => onEdit(item)}>
                  <AntDesign name="edit" size={24} color="blue" />
                </Pressable>
                <Pressable onPress={() => onDelete(item._id)}>
                  <AntDesign name="delete" size={24} color="red" />
                </Pressable>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
