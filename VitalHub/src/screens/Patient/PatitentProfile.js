import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Style";
import { ProfileImageModal } from "../../components/Dialogs/SeeMedicalDialog";
import {
  DoctorContainerInfos,
  DoctorEmail,
  DoctorName,
  InfosColumn,
  InfosContainer,
} from "../Doctor/DoctorProfile";
import { DataUser } from "../../components/Header/Header";
import {
  InputStyle,
  ScrollViewContainer,
  TextLabel,
} from "../Doctor/MedicalRecord";
import { Button } from "../../components/Button/Button";
import { UnderlinedLink } from "../../components/Links/Style";
import { APP_COLORS } from "../../utils/App_colors";
import { userDecodeToken } from "../../utils/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../service/service";
import moment from "moment";

export default function PatitentProfile({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isEditable, setIsEditable] = useState(false); // Estado de edição dos inputs
  const [emailUser, setEmailUser] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [userInfo, setUserInfo] = useState({
    dataNascimento: "",
    rg: "",
    cpf: "",
    endereco: "",
  });

  const formatCpf = (value) => {
    // caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // máscara de CPF
    const maskedValue = numericValue.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );

    return maskedValue;
  };

  const formatRg = (value) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Aplica a máscara de RG
    const maskedValue = numericValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{1})/,
      "$1.$2.$3-$4"
    );

    return maskedValue;
  };

  const toggleEdit = () => {
    setIsEditable((prevState) => !prevState); // Alterna entre editável e não editável
  };

  const handleSave = () => {
    setIsEditable(false); // Define todos os inputs como não editáveis ao salvar
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day}/${month}/${year}`;
  };

  const toggleDatePicker = () => {
    setOpen(!open);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();

        setDateOfBirth(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  async function profileLoad() {
    try {
      const token = await userDecodeToken();

      if (token) {
        console.log("Token de acesso recuperado:", token);

        setNomeUser(token.name);
        setEmailUser(token.email);

        const url = token.role == "Medico" ? "Medicos" : "Pacientes";

        try {
          const retorno = await api.get(
            `/api/${url}/BuscarPorId?id=${token.jti}`
          );

          const rg = {
            ...retorno.data,
            rg: formatRg(retorno.data.rg),
          };

          console.log(rg);
          setUserInfo(rg);
        } catch (error) {
          console.log("não foi possivel fazer o consumo da API", error);
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

  async function removeToken() {
    try {
      const token = await AsyncStorage.removeItem("token");

      if (!token) {
        navigation.navigate("Login");
      } else {
        console.log("Não foi possível recuperar o token de acesso.");
      }

      console.log(token);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);

  // useEffect(() => {
  //   // Formata o CPF quando o perfil do paciente é carregado pela primeira vez
  //   if (userInfo.cpf) {
  //     const formattedCpf = formatCpf(userInfo.cpf);

  //     console.log(formattedCpf);
  //     setCpf(formattedCpf);
  //   }
  // }, [userInfo.cpf]);

  return (
    <Container>
      <ProfileImageModal
        source={{ uri: "https://github.com/G648.png" }}
        widthImageUser={"100%"}
        heightImageUser={300}
        resizeMode="cover"
      />

      <DoctorContainerInfos>
        <DataUser>
          <DoctorName>{nomeUser}</DoctorName>

          <DoctorEmail>{emailUser}</DoctorEmail>
        </DataUser>
      </DoctorContainerInfos>

      <ScrollViewContainer width={"90%"} showsVerticalScrollIndicator={false}>
        <TextLabel>Data de nascimento</TextLabel>

        {open && (
          <DateTimePicker
            mode="date"
            display="inline"
            value={date}
            onChange={onChange}
            editable={isEditable}
            isEditable={isEditable}
          />
        )}

        {!open && (
          <Pressable onPress={toggleDatePicker}>
            <InputStyle
              value={moment(userInfo.dataNascimento).format("DD/MM/YYYY")}
              placeholderTextColor={APP_COLORS.primaryV1}
              boxHeigth={"60px"}
              boxWidth={"100%"}
              borderColor={APP_COLORS.primary}
              editable={isEditable}
              isEditable={isEditable}
            />
          </Pressable>
        )}

        <TextLabel>RG</TextLabel>

        <InputStyle
          // value={() => {
          //   setRg(userInfo.rg)
          // }}]
          value={userInfo.rg}
          // onChangeText={(text) => formatRg(text)}
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
        />

        <TextLabel>CPF</TextLabel>

        <InputStyle
          value={userInfo.cpf}
          onChangeText={(text) => formatCpf(text)}
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
        />

        <InfosContainer>
          <InfosColumn>
            <TextLabel>Endereço</TextLabel>

            <InputStyle
              value={userInfo.endereco.logradouro}
              placeholderTextColor={APP_COLORS.primaryV1}
              boxHeigth={"60px"}
              boxWidth={"100%"}
              borderColor={APP_COLORS.primary}
              editable={isEditable}
              isEditable={isEditable}
            />
          </InfosColumn>

          <InfosColumn>
            <TextLabel>Número</TextLabel>

            <InputStyle
              value={`${userInfo.endereco.numero}`}
              placeholderTextColor={APP_COLORS.primaryV1}
              boxHeigth={"60px"}
              boxWidth={"100%"}
              borderColor={APP_COLORS.primary}
              editable={isEditable}
              isEditable={isEditable}
            />
          </InfosColumn>
        </InfosContainer>

        <InfosContainer>
          <InfosColumn>
            <TextLabel>CEP</TextLabel>
            <InputStyle
              value={userInfo.endereco.cep}
              boxWidth={"100%"}
              boxHeigth={"60px"}
              editable={isEditable}
              isEditable={isEditable}
            />
          </InfosColumn>

          <InfosColumn>
            <TextLabel>Cidade</TextLabel>
            <InputStyle
              value={userInfo.endereco.cidade}
              boxWidth={"100%"}
              boxHeigth={"60px"}
              editable={isEditable}
              isEditable={isEditable}
            />
          </InfosColumn>
        </InfosContainer>

        {!isEditable && ( // Renderiza o botão de editar apenas quando os inputs não estiverem editáveis
          <Button
            width={"100%"}
            activeOpacity={0.6}
            backgroundColor={APP_COLORS.secondary}
            border={APP_COLORS.secondary}
            color={APP_COLORS.white}
            title={"Editar"}
            // marginTop={30}
            onPress={toggleEdit}
          />
        )}

        {isEditable && ( // Renderiza o botão de salvar apenas quando os inputs estiverem editáveis
          <Button
            width={"100%"}
            activeOpacity={0.6}
            backgroundColor={APP_COLORS.secondary}
            border={APP_COLORS.secondary}
            color={APP_COLORS.white}
            title={"Salvar"}
            // marginTop={-10}
            onPress={handleSave}
          />
        )}

        <Button
          width={"100%"}
          activeOpacity={0.6}
          backgroundColor={APP_COLORS.secondary}
          border={APP_COLORS.secondary}
          color={APP_COLORS.white}
          title={"Sair"}
          marginTop={15}
          onPress={removeToken}
        />

        <UnderlinedLink
          textIntput={"Cancelar"}
          ColorText={APP_COLORS.secondaryV1}
          buttonOpacity={0.6}
          onClick={handleSave}
        />
      </ScrollViewContainer>
    </Container>
  );
}
