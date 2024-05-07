import React, { useEffect, useState } from 'react'
import { Container, DataUser } from '../../components/Header/Header'
import { ButtonCamera, ContentInputSmall, ProfileImageModal } from '../../components/Dialogs/SeeMedicalDialog'
import styled from 'styled-components/native'
import { APP_COLORS } from '../../utils/App_colors'
import { InputStyle, ScrollViewContainer, TextLabel } from './MedicalRecord'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import { Pressable, Platform } from 'react-native'
import { Button } from '../../components/Button/Button'
import { UnderlinedLink } from '../../components/Links/Style'
import { userDecodeToken } from '../../utils/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from "@expo/vector-icons"
import api from "../../service/service";

export const DoctorContainerInfos = styled.View`
  width: 80%;
  padding: 20px;
  position: relative;
  top: -13%;
  background-color: ${APP_COLORS.white};
  border-radius: 8px;
  elevation: 10px;
  z-index: 9999;
`

export const DoctorName = styled.Text`
  font-size: 20px;
  color: black;
  font-family: "MontserratAlternates_600SemiBold";
  text-align:center;
`

export const DoctorEmail = styled(DoctorName)`
  font-size: 16px;
  margin-top: 20px;
`

export const Calendar = styled(Entypo)`
  position: absolute;
  /* bottom: 2px; */
  top: 9%;
  left: 90%;
`

export const InfosContainer = styled.View`
  flex-direction: row;
  justify-content:space-between;
`

export const InfosColumn = styled.View`
  flex-direction:column;
  width: 45%;
`

export const ContainerInfoDoctor = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`
export const Crm = styled(DoctorEmail)`

`

export const Especialidade = styled(Crm)`

`

export default function PatitentProfile({
  navigation,
  route,
  especialidade,
  crm,
  isDoctor
}) {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [isEditable, setIsEditable] = useState(false); // Estado de edição dos inputs
  const [emailUser, setEmailUser] = useState('');
  const [nomeUser, setNomeUser] = useState('');
  const [idUser, setIdUser] = useState('');
  const [fotoUser, setFotoUser] = useState('');
  const [dataNascimentoUser, setDataNascimentoUser] = useState("");
  const [logradouroUser, setLogradouroUser] = useState("");
  const [cepUser, setCepUser] = useState("");
  const [cidadeUser, setCidadeUser] = useState("");

  // const u = route.params.userData;

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
        const response = await api.get(`/api/Medicos/BuscarPorId?id=${idUser}`);

        setNomeUser(token.name)
        setEmailUser(token.email)
        setIdUser(token.jti)
        setDataNascimentoUser(formatDate(response.data.dataNascimento));
        setLogradouroUser(response.data.endereco.logradouro);
        setCepUser(response.data.endereco.cep);
        setCidadeUser(response.data.endereco.cidade);
        setFotoUser(response.data.idNavigation.foto);
  

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
        source={{ uri: fotoUser }}
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
        <ContainerInfoDoctor>
          <Crm>
            {crm}
          </Crm>
        
          <Especialidade>
            {especialidade}
          </Especialidade>
        </ContainerInfoDoctor>

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
          Especialidade
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

{/* <DateTimePicker
            data={consultas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              mode = 'date'
              display = 'inline'
              value = { date }
              onChange = { onChange }
              editable = { isEditable }
              isEditable = { isEditable }
            }}
          />
        )} */}

        {!open && (

          <Pressable
            onPress={toggleDatePicker}>
            <InputStyle
              // placeholder={`${ route.params.userData.EspecialidadeId }`}
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

        <Calendar 
          name="calendar"
          size={24}
          color={APP_COLORS.primaryV1}
        />

        <TextLabel>
          CRM
        </TextLabel>

        <InputStyle
          // placeholder={`${ route.params.userData.CRM }`}
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
