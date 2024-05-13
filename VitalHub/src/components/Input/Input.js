import styled from "styled-components";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#34898F",
})`
  width: ${({ width = "90%" }) => width};
  height: 53px;
  padding: 16px;
  margin: 8px;
  border: 2px solid #49b3ba;
  border-radius: 5px;
  color: #34898f;
  font-size: 16px;
  font-family: "MontserratAlternates_600SemiBold";
`;

export function InputValues({ secureTextEntry, isRecoveryPassword, value, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Input secureTextEntry={secureTextEntry && !showPassword} {...props} value={value} />
      {secureTextEntry && (
        <Entypo
          name={showPassword ? "eye" : "eye-with-line"}
          size={24}
          color="#34898F"
          style={{
            position: "relative",
            right: isRecoveryPassword ? -310 : -150,
            top: -45,
          }}
          onPress={() => setShowPassword(!showPassword)}
        />
      )}
    </>
  );
}
