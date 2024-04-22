import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Container } from "../../../components/Container/Style";
import { ComeBack } from "../../../components/GoBackPage/GoBackPage";
import { Logo } from "../../../components/Logo/Style";
import { Title } from "../../../components/Title/Style";
import { ParagrafText } from "../../../components/Paragraf/Paragraf";
import { APP_COLORS } from "../../../utils/App_colors";
import { InputValues } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import styled from "styled-components/native";

export const StrengthMeter = styled.View`
  width: 100%;
  height: 20px;
  background-color: ${APP_COLORS.grayV6};
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
`;

export default function RecoverPassword({ navigation }) {
  const [password, setPassword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState("");
  const [senha, setSenha] = useState('')

  async function AtualizarSenha() {
    await api.put(`/Usuario/AlterarSenha/?email=${route.params.emailRecuperacao}`,{
      senhaNova : senha
    })
    .then(() => {
      navigation.replace("Login");
    }).catch(error => {
      console.log(error)
    })
  }

  const validatePassword = (input) => {
    let newSuggestions = [];

    if (input.length < 8) {
      newSuggestions.push("A senha deverá ter pelo menos 8 caracteres");
    }
    if (!/\d/.test(input)) {
      newSuggestions.push("Adicione pelo menos um número");
    }

    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
      newSuggestions.push("Inclua letras maiúsculas e minúsculas");
    }

    if (!/[^A-Za-z0-9]/.test(input)) {
      newSuggestions.push("Inclua pelo menos um caractere especial");
    }

    setSuggestions(newSuggestions);

    // Determine password strength based on suggestions
    if (newSuggestions.length === 0) {
      setStrength("Muito forte");
    } else if (newSuggestions.length <= 1) {
      setStrength("Forte");
    } else if (newSuggestions.length <= 2) {
      setStrength("Moderada");
    } else if (newSuggestions.length <= 3) {
      setStrength("Fraca");
    } else {
      setStrength("Muito fraca");
    }
  };

  return (
    <Container>
      <ComeBack
        buttonOpacity={0.8}
        isClosable={true}
        onClick={() => navigation.navigate("Login")}
      />

      <Logo source={require("../../../assets/Images/LogoBlue.png")} />

      <Title>Redefinir senha</Title>

      <ParagrafText
        FontColorParagrafo={APP_COLORS.grayV3}
        FontSizeParagrafo={16}
        textValue={"Insira e confirme a sua nova senha"}
      />
      <ScrollView style={{ width: "90%" }}>
        <InputValues
          placeholder="Nova senha"
          secureTextEntry={true}
          onChangeText={(txt) => {
            setPassword(txt);
            validatePassword(txt);
          }}
          width="100%"
          isRecoveryPassword={true}
        />

        <StrengthMeter>
          <View
            style={{
              width: `${
                strength === "Muito forte"
                  ? 100
                  : strength === "Forte"
                  ? 75
                  : strength === "Moderada"
                  ? 50
                  : strength === "Fraca"
                  ? 25
                  : 0
              }%`,
              height: 20,
              backgroundColor:
                strength === "Muito Fraca"
                  ? "red"
                  : strength === "Fraca"
                  ? "orange"
                  : strength === "Moderada"
                  ? "yellow"
                  : strength === "Forte"
                  ? "green"
                  : "limegreen",
            }}
          ></View>
        </StrengthMeter>
        <ParagrafText
          FontColorParagrafo={APP_COLORS.primary}
          FontSizeParagrafo={16}
          textValue={`Senha: ${strength}`}
        />
        {suggestions.map((suggestion, index) => {
          return (
            <Text key={index}>
              {suggestion}
              {"\n"}
            </Text>
          );
        })}

        <InputValues
          placeholder="Confirmar senha"
          secureTextEntry={true}
          // onChangeText={(txt) =>
          //   setPassword({
          //     txt,
          //   })
          // }
          width="100%"
          isRecoveryPassword={true}
          value={senha}
          onChangeText={(txt) => setSenha(txt)}
        />

        <Button
          activeOpacity={0.8}
          backgroundColor={APP_COLORS.secondary}
          border={APP_COLORS.secondary}
          color={APP_COLORS.white}
          height={48}
          title={"Confirmar nova senha"}
          onPress={() => AtualizarSenha()}
          marginTop={30}
          width={'100%'}
        />
      </ScrollView>
    </Container>
  );
}
