import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function InputField({ placeholder, secureTextEntry = false }) {

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { fontFamily: "MyRobotoMedium" }]}
        placeholder={placeholder}
        placeholderTextColor="#708872"
        secureTextEntry={secureTextEntry}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    width: "100%",
    height: 40,
    fontSize: 16,
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#708872",
    fontFamily: "Roboto-Medium",
  },
});
