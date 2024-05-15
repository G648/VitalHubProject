import React, { useEffect, useState } from "react";
import { Container } from "../../../components/Container/Style";
import { Logo } from "../../../components/Logo/Style";
import { Title } from "../../../components/Title/Style";
import { Input, InputValues } from "../../../components/Input/Input";
import { LinkMedium, UnderlinedLink } from "../../../components/Links/Style";
import { Button, ButtonFlex } from "../../../components/Button/Button";
import { ActivityIndicator, Text, View } from "react-native";
import { ComeBack } from "../../../components/GoBackPage/GoBackPage";
import { APP_COLORS } from "../../../utils/App_colors";
import api, { LoginResource } from "../../../service/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { userDecodeToken } from "../../../utils/Auth";

const Login = ({ navigation }) => {
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitData, setSubmitData] = useState({
    email: "gabrieldemetrio571@gmail.com",
    senha: "123456",
  });

  const [loading, setLoading] = useState(false);

  async function LoadUserParams() {
    try {
      const token = await userDecodeToken();

      if (token) {
        if (token.role === "Medico") {
          navigation.navigate("DoctorHome");
        } else {
          navigation.navigate("HomePatient");
        }
      } else {
        console.log("Não foi possível recuperar o token de acesso.");
      }
    } catch (error) {
      console.error(
        "Erro ao recuperar o token de acesso do AsyncStorage:",
        error
      );
    }
  }

  async function handleSelectUser() {
    setLoading(true);

    if (!isFormValid) {
      console.log("Form submitted successfully!");
    } else {
      showErrorToastMessage();
    }

    try {
      const response = await api.post(LoginResource, submitData);

      await AsyncStorage.setItem("token", JSON.stringify(response.data));

      await LoadUserParams();
    } catch (error) {
      showValidationLogin();

      console.log(`teste ${error}`);
    } finally {
      setLoading(false);
    }
  }

  const showErrorToastMessage = () => {
    Toast.show({
      type: "success",
      text1: "Login efetuado com sucesso",
      text1Style: {
        fontSize: 16,
      },
      text2: `seja bem vindo: ${submitData.email}`,
      text2Style: {
        fontSize: 14,
      },
      position: "bottom",
      bottomOffset: 40,
    });
  };

  const showValidationLogin = () => {
    Toast.show({
      type: "error",
      text1: "Autenticação",
      text2: "Usuário ou senha inválidos",
      visibilityTime: 4000,
      position: "bottom",
      bottomOffset: 40,
    });
  };

  const validateForm = () => {
    let errors = {};

    if (!submitData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(submitData.email)) {
      errors.email = "Email is invalid.";
    }

    if (!submitData.senha) {
      errors.senha = "Password is required.";
    } else if (submitData.senha.length < 6) {
      errors.senha = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [submitData]);

  return (
    <Container>
      <ComeBack
        onClick={() => navigation.navigate("Navegacao")}
        buttonOpacity={1}
      />

      <Logo source={require("../../../assets/Images/LogoBlue.png")} />
      <Title>Entrar ou criar conta</Title>

      <Input
        placeholder="Usuário ou E-mail"
        onChangeText={(txt) =>
          setSubmitData({
            ...submitData,
            email: txt,
          })
        }
      />

      <InputValues
        placeholder={"Senha"}
        secureTextEntry={true}
        onChangeText={(txt) =>
          setSubmitData({
            ...submitData,
            senha: txt,
          })
        }
        isRecoveryPassword={false}
      />

      {Object.values(errors).map((error, index) => (
        <Text
          key={index}
          style={{ color: "red", fontSize: 16, marginBottom: 12 }}
        >
          {error}
        </Text>
      ))}

      <UnderlinedLink
        textIntput={"Esqueceu a sua senha?"}
        ColorText={APP_COLORS.grayV4}
        buttonOpacity={0.8}
        textAlign={"flex-start"}
        onClick={() => navigation.navigate("Cadastro")}
        buttonAlign={"flex-start"}
      />

      <Button
        color={APP_COLORS.white}
        border={isFormValid ? APP_COLORS.secondary : APP_COLORS.grayV6}
        activeOpacity={1}
        title={
          !loading ? (
            "Entrar".toUpperCase()
          ) : (
            <ActivityIndicator size="small" color="#fff" />
          )
        }
        marginTop={15}
        disabled={!isFormValid}
        backgroundColor={isFormValid ? APP_COLORS.secondary : APP_COLORS.grayV6}
        onPress={() => handleSelectUser()}
      />

      <ButtonFlex>
        <Button
          border={APP_COLORS.secondary}
          marginTop={15}
          color={APP_COLORS.secondary}
          title={"Entrar com Google".toUpperCase()}
          activeOpacity={0.8}
        />
      </ButtonFlex>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          justifyContent: "space-between",
          width: "90%",
          gap: -60,
        }}
      >
        <LinkMedium>Não tem conta ?</LinkMedium>

        <UnderlinedLink
          textIntput={"Criar uma conta agora!"}
          ColorText={APP_COLORS.secondary}
          buttonOpacity={0.8}
          onClick={() => navigation.navigate("CadastroUser")}
          buttonAlign={"end"}
        />
      </View>
    </Container>
  );
};

export default Login;
