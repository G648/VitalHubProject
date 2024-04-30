import { Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Container } from "../../../components/Container/Style";
import {
  ButtonCamera,
  ContentInputSmall,
  ProfileImageModal,
} from "../../../components/Dialogs/SeeMedicalDialog";
import {
  DoctorContainerInfos,
  DoctorEmail,
  DoctorName,
} from "../../Doctor/DoctorProfile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DataUser } from "../../../components/Header/Header";
import {
  InputStyle,
  ScrollViewContainer,
  TextLabel,
} from "../../Doctor/MedicalRecord";
import { APP_COLORS } from "../../../utils/App_colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "../../../components/Button/Button";
import { UnderlinedLink } from "../../../components/Links/Style";
import axios from "axios";

export default function InfosCadastroUser({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isEditable, setIsEditable] = useState(false); // Estado de edição dos inputs
  const [emailUser, setEmailUser] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [cep, setCep] = useState("")
  const [infosEndereco, setInfosEndereco] = useState({})

  const {email, senha} = route.params;

  console.log(email, senha);

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


  async function GetCep() {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        setInfosEndereco(response.data)

        console.log(infosEndereco);
    } catch (error) {
        console.log("deu ruim " + error);
    }
  }

  useEffect(() => {
    GetCep();
  },[cep])

  return (
    <Container>
      <ProfileImageModal
        source={{ uri: "foto profile api" }}
        widthImageUser={"100%"}
        heightImageUser={300}
        resizeMode="cover"
      />

      <DoctorContainerInfos>
        <ContentInputSmall>
          <ButtonCamera
            onPress={() => navigation.navigate("MedicalExamsPhotos")}
          >
            <MaterialCommunityIcons
              name="camera-plus"
              size={20}
              color="fbfbfb"
            ></MaterialCommunityIcons>
          </ButtonCamera>
        </ContentInputSmall>
        <DataUser>
          <DoctorName>{nomeUser}</DoctorName>

          <DoctorEmail>{email}</DoctorEmail>
        </DataUser>
      </DoctorContainerInfos>

      <ScrollViewContainer width={"100%"} showsVerticalScrollIndicator={false}>
        <TextLabel>Nome</TextLabel>

        <InputStyle
          placeholder="Guilherme Amorim"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
          onChangeText={(txt) => setNomeUser(txt)}
        />

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
              placeholder="03/08/02"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
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
          placeholder="859****"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
        />
        <TextLabel>CPF</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
        />
        <TextLabel>CEP</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
            onChangeText={(txt) => setCep(txt)}
        />
        <TextLabel>Logradouro</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
          value={infosEndereco.logradouro}
        />
        <TextLabel>Numero</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
        />
        <TextLabel>Cidade</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
          value={infosEndereco.localidade}
        />

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
