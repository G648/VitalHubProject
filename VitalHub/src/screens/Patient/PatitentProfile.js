import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container/Style'
import { ButtonCamera, ContentInputSmall, ProfileImageModal } from '../../components/Dialogs/SeeMedicalDialog'
import { DoctorContainerInfos, DoctorEmail, DoctorName, InfosColumn, InfosContainer } from '../Doctor/DoctorProfile'
import { DataUser } from '../../components/Header/Header'
import { InputStyle, ScrollViewContainer, TextLabel } from '../Doctor/MedicalRecord'
import { Button } from '../../components/Button/Button'
import { UnderlinedLink } from '../../components/Links/Style'
import { APP_COLORS } from '../../utils/App_colors'
import { userDecodeToken } from '../../utils/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import api from "../../service/service";


export default function PatitentProfile({
  navigation,
  route
}) {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [isEditable, setIsEditable] = useState(false); // Estado de edição dos inputs
  const [emailUser, setEmailUser] = useState('');
  const [nomeUser, setNomeUser] = useState('');
  const [idUser, setIdUser] = useState('');
  const [fotoUser, setFotoUser] = useState('');

  const toggleEdit = () => {
    setIsEditable(prevState => !prevState); // Alterna entre editável e não editável
  };

  const handleSave = () => {
    setIsEditable(false); // Define todos os inputs como não editáveis ao salvar
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate)

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    return `${day}/${month}/${year}`
  }

  const toggleDatePicker = () => {
    setOpen(!open);
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate)

      if (Platform.OS === "android") {
        toggleDatePicker()

        setDateOfBirth(formatDate(currentDate));
      }
    } else {
      toggleDatePicker()
    }
  }




  async function profileLoad() {
    try {
      const token = await userDecodeToken();

      if (token) {
        console.log('Token de acesso recuperado:', token);

        setNomeUser(token.name)
        setEmailUser(token.email)
        setIdUser(token.jti)

      } else {
        console.log('Não foi possível recuperar o token de acesso.');
      }
    } catch (error) {
      console.error('Erro ao recuperar o token de acesso do AsyncStorage:', error);
    }
  }

  async function removeToken() {
    try {

      const token = await AsyncStorage.removeItem('token');

      if (!token) {
        navigation.navigate('Login')

      } else {
        console.log('Não foi possível recuperar o token de acesso.');
      }

      console.log(token);
    } catch (error) {
      console.log(error);
    }
  }

  async function UpdatePhoto() {
    const formData = new FormData();
    formData.append("Arquivo", {
      uri: route.params.photoUri,
      name: `image.jpg`,
      type: `image/jpg`
    })

    try {
      console.log(route.params.photoUri);
      await api.put(`/api/Usuario/AlterarFotoPerfil?id=${idUser}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setFotoUser(route.params.photoUri);
      console.log("Foto de perfil atualizada com sucesso!");
    } catch (error) {
      console.log("Erro ao tentar atualizar a foto de perfil:", error);
    }

  }

  useEffect(() => {
    profileLoad();
  }, [])

  useEffect(() => {
    if (route.params && idUser != '') {
      UpdatePhoto()
    }
  }, [route.params, idUser])




  return (
    <Container>
      <ProfileImageModal
        source={{ uri: "https://github.com/G648.png" }}
        widthImageUser={"100%"}
        heightImageUser={300}
        resizeMode='cover'
      />



      <DoctorContainerInfos>
        <ContentInputSmall>
          <ButtonCamera onPress={() => navigation.navigate("MedicalProfilePhotos")}>
            <MaterialCommunityIcons name="camera-plus" size={20} color="fbfbfb"></MaterialCommunityIcons>
          </ButtonCamera>
        </ContentInputSmall>
        <DataUser>
          <DoctorName>
            {nomeUser}
          </DoctorName>

          <DoctorEmail>
            {emailUser}
          </DoctorEmail>
        </DataUser>
      </DoctorContainerInfos>

      <ScrollViewContainer
        width={"90%"}
        showsVerticalScrollIndicator={false}
      >
        <TextLabel>
          Data de nascimento
        </TextLabel>

        {open && (

          <DateTimePicker
            mode='date'
            display='inline'
            value={date}
            onChange={onChange}
            editable={isEditable}
            isEditable={isEditable}
          />
        )}

        {!open && (

          <Pressable
            onPress={toggleDatePicker}>
            <InputStyle
              placeholder='03/08/02'
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor={APP_COLORS.primaryV1}
              boxHeigth={'60px'}
              boxWidth={"100%"}
              borderColor={APP_COLORS.primary}
              editable={isEditable}
              isEditable={isEditable}
            />
          </Pressable>
        )}

        {/* <Calendar
          name="calendar"
          size={24}
          color={APP_COLORS.primaryV1}
        /> */}

        <TextLabel>
          CPF
        </TextLabel>

        <InputStyle
          placeholder='859*********'
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={'60px'}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
        />
        <TextLabel>
          Endereço
        </TextLabel>

        <InputStyle
          placeholder='Rua Vicenso Silva, 987'
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={'60px'}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
        />


        <InfosContainer>
          <InfosColumn>
            <TextLabel>
              CEP
            </TextLabel>
            <InputStyle
              boxWidth={"100%"}
              boxHeigth={"60px"}
              editable={isEditable}
              isEditable={isEditable}
            />
          </InfosColumn>

          <InfosColumn>
            <TextLabel>
              Cidade
            </TextLabel>
            <InputStyle
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
            activeOpacity={.6}
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
            activeOpacity={.6}
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
          activeOpacity={.6}
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
          buttonOpacity={.6}
          onClick={handleSave}

        />

      </ScrollViewContainer>

    </Container>
  )
}

