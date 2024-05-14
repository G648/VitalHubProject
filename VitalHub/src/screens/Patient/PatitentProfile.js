import { ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Style";
import {
  ButtonCamera,
  ContentInputSmall,
  ProfileImageModal,
} from "../../components/Dialogs/SeeMedicalDialog";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../../service/service";

export default function PatitentProfile({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [isEditable, setIsEditable] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [idUser, setIdUser] = useState();
  const [fotoUser, setFotoUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [retornoUserData, setRetornoUserData] = useState({
    rg: "",
    cpf: "",
    endereco: {
      logradouro: "",
      numero: "",
      cep: "",
      cidade: "",
    },
  });

  const toggleEdit = () => {
    setIsEditable((prevState) => !prevState);
  };

  const handleSave = () => {
    setIsEditable(false);
  };

  const toggleDatePicker = () => {
    setOpen(!open);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setDateOfBirth(currentDate);
      toggleDatePicker();
    } else {
      toggleDatePicker();
    }
  };

  async function GetByIdUser() {
    setIsLoading(true);
    const response = await api
      .get(`/api/Pacientes/BuscarPorId?id=${idUser}`)
      .catch((error) => console.log(error.request));
    console.log(response.data);

    setRetornoUserData(response.data);

    setIsLoading(false);
  }

  async function profileLoad() {
    try {
      const token = await userDecodeToken();

      if (token) {
        console.log("Token de acesso recuperado:", token);

        setNomeUser(token.name);
        setEmailUser(token.email);
        setIdUser(token.jti);
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
      await AsyncStorage.removeItem("token");

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  }

  async function UpdatePhoto() {
    const formData = new FormData();
    formData.append("Arquivo", {
      uri: route.params.photoUri,
      name: `image.jpg`,
      type: `image/jpg`,
    });

    console.log('PHOTO ATUALIZADAAAAAAAAAAAA');
    try {
      console.log(route.params.photoUri);
      await api.put(`/api/Usuario/AlterarFotoPerfil?id=${idUser}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFotoUser(route.params.photoUri);
      console.log("Foto de perfil atualizada com sucesso!");
    } catch (error) {
      console.log("Erro ao tentar atualizar a foto de perfil:", error);
    }
  }

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    profileLoad();
  }, []);

  useEffect(() => {
    if (route.params && idUser != "") {
      UpdatePhoto();
    }
  }, [route.params, idUser]);

  useEffect(() => {
    if (idUser) {
      GetByIdUser();
    }
  }, [idUser]);

  return (
    <Container>
      <ProfileImageModal
        source={{ uri: fotoUser }}
        widthImageUser={"100%"}
        heightImageUser={300}
        resizeMode="cover"
      />

      <DoctorContainerInfos>
        <ContentInputSmall>
          <ButtonCamera
            onPress={() => navigation.navigate("MedicalProfilePhotos")}
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

          <DoctorEmail>{emailUser}</DoctorEmail>
        </DataUser>
      </DoctorContainerInfos>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollViewContainer width={"90%"} showsVerticalScrollIndicator={false}>
          <TextLabel>Data de nascimento</TextLabel>
          {open && (
            <DateTimePicker
              mode="date"
              display="inline"
              value={dateOfBirth}
              onChange={onChange}
              editable={isEditable}
            />
          )}
          {!open && (
            <Pressable onPress={toggleDatePicker}>
              <InputStyle
                placeholder={formatDate(dateOfBirth)} // Use a função formatDate aqui
                placeholderTextColor={APP_COLORS.primaryV1}
                boxHeigth={"60px"}
                boxWidth={"100%"}
                borderColor={APP_COLORS.primary}
                editable={false}
                isEditable={isEditable}
              />
            </Pressable>
          )}
          <TextLabel>Rg</TextLabel>
          <InputStyle
            value={retornoUserData.rg}
            placeholderTextColor={APP_COLORS.primaryV1}
            boxHeigth={"60px"}
            boxWidth={"100%"}
            borderColor={APP_COLORS.primary}
            editable={isEditable}
            isEditable={isEditable}
          />
          <TextLabel>CPF</TextLabel>
          <InputStyle
            value={retornoUserData.cpf}
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
                value={retornoUserData.endereco.logradouro}
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
                value={retornoUserData.endereco.numero.toString()}
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
                value={retornoUserData.endereco.cep}
                boxWidth={"100%"}
                placeholderTextColor={APP_COLORS.primaryV1}
                boxHeigth={"60px"}
                editable={isEditable}
                isEditable={isEditable}
              />
            </InfosColumn>

            <InfosColumn>
              <TextLabel>Cidade</TextLabel>
              <InputStyle
                value={retornoUserData.endereco.cidade}
                boxWidth={"100%"}
                placeholderTextColor={APP_COLORS.primaryV1}
                boxHeigth={"60px"}
                editable={isEditable}
                isEditable={isEditable}
              />
            </InfosColumn>
          </InfosContainer>
          {!isEditable && (
            <Button
              width={"100%"}
              activeOpacity={0.6}
              backgroundColor={APP_COLORS.secondary}
              border={APP_COLORS.secondary}
              color={APP_COLORS.white}
              title={"Editar"}
              onPress={toggleEdit}
            />
          )}

          {isEditable && (
            <Button
              width={"100%"}
              activeOpacity={0.6}
              backgroundColor={APP_COLORS.secondary}
              border={APP_COLORS.secondary}
              color={APP_COLORS.white}
              title={"Salvar"}
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
      )}
    </Container>
  );
}
