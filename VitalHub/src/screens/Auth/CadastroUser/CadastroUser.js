import React, { useEffect, useState } from "react";
import { Container } from "../../../components/Container/Style";
import { Title } from "../../../components/Title/Style";
import { ComeBack } from "../../../components/GoBackPage/GoBackPage";
import { Logo } from "../../../components/Logo/Style";
import { ParagrafText } from "../../../components/Paragraf/Paragraf";
import { APP_COLORS } from "../../../utils/App_colors";
import { InputValues } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { UnderlinedLink } from "../../../components/Links/Style";
import { Text } from "react-native";

export default function CadastroUser({ navigation }) {
  const [userData, setUserData] = useState({
    email: "",
    senha: "",
  });
  const [passwordVerification, setPasswordVerification] = useState();
  const [passwordMatch, setPasswordMatch] = useState(false);

  const isFormValid =
    userData.email !== "" &&
    userData.senha !== "" &&
    passwordVerification !== "";

  const PasswordValidation = function () {
    if (userData.senha === passwordVerification) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  useEffect(() => {
    PasswordValidation();
  }, [userData.senha, passwordVerification]);

  return (
    <Container>
      <ComeBack
        buttonOpacity={0.8}
        isClosable={false}
        onClick={() => navigation.navigate("Login")}
      />

      <Logo source={require("../../../assets/Images/LogoBlue.png")} />

      <Title>Criar Conta</Title>

      <ParagrafText
        textValue={
          "Insira seu endereço de e-mail e senha para realizar seu cadastro."
        }
        FontColorParagrafo={APP_COLORS.grayV2}
        FontSizeParagrafo={16}
      />

      <InputValues
        placeholder={"E-mail"}
        secureTextEntry={false}
        onChangeText={(txt) =>
          setUserData({
            ...userData,
            email: txt,
          })
        }
      />
      <InputValues
        placeholder={"Senha"}
        secureTextEntry={true}
        onChangeText={(txt) =>
          setUserData({
            ...userData,
            senha: txt,
          })
        }
      />
      <InputValues
        placeholder={"Confirmar Senha"}
        secureTextEntry={true}
        onChangeText={(txt) => setPasswordVerification(txt)}
      />
      {/* Exibindo a mensagem para o usuário */}
      {!passwordMatch && (
        <Text style={{ color: "red" }}>As senhas não são iguais</Text>
      )}

      {isFormValid ? (
        <Button
          title={"Continuar".toUpperCase()}
          backgroundColor={
            isFormValid ? APP_COLORS.secondary : APP_COLORS.grayV2
          }
          border={isFormValid ? APP_COLORS.secondary : APP_COLORS.grayV2}
          color={APP_COLORS.white}
          marginTop={30}
          activeOpacity={0.8}
          onPress={() =>
            navigation.push("InfosCadastroUser", {
              email: userData.email,
              senha: userData.senha,
            })
          }
        />
      ) : (
        <Button
          title={"Continuar".toUpperCase()}
          backgroundColor={
            isFormValid ? APP_COLORS.secondary : APP_COLORS.grayV6
          }
          border={isFormValid ? APP_COLORS.secondary : APP_COLORS.grayV6}
          color={APP_COLORS.white}
          marginTop={30}
          activeOpacity={0.8}
          onPress={() =>
            navigation.push("InfosCadastroUser", {
              email: userData.email,
              senha: userData.senha,
            })
          }
          disabled={true}
        />
      )}

      <UnderlinedLink
        textIntput={"Cancelar"}
        buttonAlign={"center"}
        buttonOpacity={0.6}
        ColorText={APP_COLORS.secondaryV1}
        onClick={() => navigation.navigate("Login")}
      />
    </Container>
  );
}
