import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface TextfieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

export default function Textfield({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: TextfieldProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#FFF"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#FFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    color: "#FFF",
  },
});
