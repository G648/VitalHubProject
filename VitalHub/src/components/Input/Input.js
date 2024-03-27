import styled from "styled-components";
import { Entypo } from '@expo/vector-icons';
import { useState } from "react";

export const Input = styled.TextInput.attrs(
    {
        placeholderTextColor: '#34898F'
    }
)`
width: 90%;
height: 53px;
padding: 16px;
margin-top: 15px;
border: 2px solid #49B3BA;
border-radius: 5px;
color: #34898F;
font-size: 16px;
font-family: 'MontserratAlternates_600SemiBold';
`

export function InputValues({
    secureTextEntry,
    ...props
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Input
                secureTextEntry={secureTextEntry && !showPassword}
                {...props}
            />
            {secureTextEntry && (
                <Entypo
                    name={showPassword ? "eye" : "eye-with-line"}
                    size={24}
                    color="#34898F"
                    style={{ position: 'relative', right: -150, top: -38 }}
                    onPress={() => setShowPassword(!showPassword)}
                />
            )}
        </>
    );
}