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
import axios from "axios";

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
// export const CidadeColumn = styled(InfosColumn)`
//   width: 50px;
// `

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
  const [isEditable, setIsEditable] = useState(true); // Estado de edição dos inputs
  const [emailUser, setEmailUser] = useState('');
  const [nomeUser, setNomeUser] = useState('');
  const [idUser, setIdUser] = useState('');
  const [fotoUser, setFotoUser] = useState('');
  const [especialidadeUser, setEspecialidadeUser] = useState("");
  const [logradouroUser, setLogradouroUser] = useState("");
  const [cepUser, setCepUser] = useState("");
  const [crmUser, setCrmUser] = useState("");
  const [cidadeUser, setCidadeUser] = useState("");
  const [numeroUser, setNumeroUser] = useState("");
  const [infosEndereco, setInfosEndereco] = useState({});

  //novas informações do usuário
  const [newEspecialidadeUser, setNewEspecialidadeUser] = useState("");
  const [newCrmUser, setNewCrmUser] = useState("");
  const [newCepUser, setNewCepUser] = useState("");
  const [newNumeroUser, setNewNumeroUser] = useState("");

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

  async function GetByIdUser() {
    try {
      const response = await api.get(`/api/Medicos/BuscarPorId?id=${idUser}`);
      // console.log(response);

      setEspecialidadeUser(response.data.especialidade.especialidade1);
      setLogradouroUser(response.data.endereco.logradouro);
      setCrmUser(response.data.crm)
      setCepUser(response.data.endereco.cep);
      setCidadeUser(response.data.endereco.cidade);
      setFotoUser(response.data.idNavigation.foto);
      setNumeroUser(response.data.endereco.numero);
      setTypeUSer(response.data.idNavigation.tipoUsuarioId);

    } catch (error) {
      // console.log("deu ruim na requisição de usuario por ID");
      // console.log(error.request);
    }
  }


  async function profileLoad() {
    const token = await userDecodeToken();
    setIdUser(token.jti)
    try {

      if (token) {
        console.log('Token de acesso recuperado:', token);

        setNomeUser(token.name)
        setEmailUser(token.email)

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

      // console.log(token);
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
      // console.log(route.params.photoUri);
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

  async function UpdateInfo() {
    try {
      const token = JSON.parse(await AsyncStorage.getItem('token')).token;
      console.log(token);
      await api.put(`/api/Medicos`, {
        cep: newCepUser,
        logradouro: logradouroUser,
        numero: newNumeroUser,
        cidade: cidadeUser,
        especialidade1: especialidadeUser,
        crm: newCrmUser
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Deu bom!');

    } catch (error) {
      console.error('Erro ao atualizar as informações:', error);
    }
  }

  async function GetCep() {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${newCepUser}/json/`);

      setInfosEndereco(response.data);

      console.log(infosEndereco);
    } catch (error) {
      console.log("deu ruim " + error);
    }
  }

  useEffect(() => {
    GetCep();
    console.log(infosEndereco);
  }, [newCepUser]);

  useEffect(() => {
    profileLoad();
  }, [])

  useEffect(() => {
    if (route.params && idUser != '') {
      UpdatePhoto()
    }
  }, [route.params, idUser])

  useEffect(() => {
    GetByIdUser();
  });

  // useEffect(() => {
  // })

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
        <InputStyle
          placeholder={especialidadeUser}
          value={newEspecialidadeUser}
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={'60px'}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
          onChangeText={(txt) => setNewEspecialidadeUser(txt)}
        />

        <TextLabel>
          CRM
        </TextLabel>

        <InputStyle
          placeholder={crmUser}
          value={newCrmUser}
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={'60px'}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={isEditable}
          isEditable={isEditable}
          onChangeText={(txt) => setNewCrmUser(txt)}

        />
        <InfosContainer>
          <InfosColumn>
            <TextLabel>
              CEP
            </TextLabel>
            <InputStyle
              placeholder={cepUser}
              value={newCepUser}
              placeholderTextColor={APP_COLORS.primaryV1}
              boxWidth={"100%"}
              boxHeigth={"60px"}
              editable={isEditable}
              isEditable={isEditable}
              onChangeText={(txt) => setNewCepUser(txt)}
            />
          </InfosColumn>

          <InfosColumn>
            <TextLabel>
              Cidade
            </TextLabel>
            <InputStyle
              placeholder={infosEndereco.localidade}
              // value={cidadeUser}
              placeholderTextColor={APP_COLORS.primaryV1}
              boxWidth={"100%"}
              boxHeigth={"60px"}
              editable={false}
              isEditable={isEditable}
            />
          </InfosColumn>
        </InfosContainer>



        <TextLabel>
          Endereço
        </TextLabel>

        <InputStyle
          // placeholder={logradouroUser}
          placeholder={infosEndereco.logradouro}
          // value={logradouroUser}
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={'60px'}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          editable={false}
          isEditable={isEditable}
        />


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
            onPress={() => { UpdateInfo(); handleSave(); }}
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

        {isEditable && (
          <UnderlinedLink
            textIntput={"Cancelar"}
            ColorText={APP_COLORS.secondaryV1}
            buttonOpacity={.6}
            onClick={handleSave}

          />
        )}

      </ScrollViewContainer>

    </Container>
  )
}
