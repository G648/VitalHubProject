import { ActivityIndicator, Pressable } from "react-native";
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
import { useRoute } from "@react-navigation/native";
import api from "../../../service/service";

export default function InfosCadastroUser({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [isEditable, setIsEditable] = useState(false); // Estado de edição dos inputs
  const [nomeUser, setNomeUser] = useState("");
  const [cep, setCep] = useState("");
  const [infosEndereco, setInfosEndereco] = useState({});
  const [image, setImage] = useState();
  const [rg, setRg] = useState("")
  const [cpf, setCpf] = useState("")
  const [numero, setNumero] = useState()
  const { email, senha } = route.params;
  const { params } = useRoute();

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

  console.log(dateOfBirth);

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      setDateOfBirth(formatDate(currentDate));
    }
    toggleDatePicker(); // Sempre feche o seletor de data após a seleção ser feita
  };

  async function GetCep() {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      setInfosEndereco(response.data);

      console.log(infosEndereco);
    } catch (error) {
      console.log("deu ruim " + error);
    }
  }

  async function SubmitForm() {
    const form = new FormData();
    var dateStr = (new Date(date)).toUTCString();
    console.log(dateStr);
    form.append("Arquivo", {
      uri: image,
      name: "image.jpg",
      type: "image/jpg",
    });
    form.append("Rg", rg);
    form.append("Cpf", cpf);
    form.append("DataNascimento", dateStr)
    form.append("Cep", cep)
    form.append("Logradouro", infosEndereco.logradouro )
    form.append("Numero", numero )
    form.append("Cidade", infosEndereco.localidade )
    form.append("Nome", nomeUser )
    form.append("Email", email )
    form.append("Senha", senha )
    form.append("IdTipoUsuario", "AD755F08-904B-497A-A496-C5883F650E7D" )

    console.log(form);

    await api.post("/api/Pacientes" , form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      navigation.navigate("Login")
    }).catch(error => {
      console.log( error.request);
    })
  }

  useEffect(() => {
    GetCep();
  }, [cep]);

  useEffect(() => {
    console.log(params);
    if (params.image) {
      setImage(params.image);
    }
  }, [params]);


  return (
    <Container>
      <ProfileImageModal
        source={image ? { uri: image } : "deu ruim"}
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
          isEditable={!isEditable}
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
              isEditable={isEditable}
              editable={isEditable}
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
          isEditable={!isEditable}
          onChangeText={(txt) => setRg(txt)}
          value={rg}
        />
        <TextLabel>CPF</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          isEditable={!isEditable}
          onChangeText={(txt) => setCpf(txt)}
          value={cpf}
        />
        <TextLabel>CEP</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          isEditable={!isEditable}
          onChangeText={(txt) => setCep(txt)}
        />
        <TextLabel>Logradouro</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          isEditable={!isEditable}
          value={infosEndereco.logradouro}
        />
        <TextLabel>Numero</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          isEditable={!isEditable}
          onChangeText={(txt) => setNumero(txt)}
        />
        <TextLabel>Cidade</TextLabel>

        <InputStyle
          placeholder="859*********"
          placeholderTextColor={APP_COLORS.primaryV1}
          boxHeigth={"60px"}
          boxWidth={"100%"}
          borderColor={APP_COLORS.primary}
          isEditable={!isEditable}
          value={infosEndereco.localidade}
        />

        {!isEditable && ( // Renderiza o botão de editar apenas quando os inputs não estiverem editáveis
          <Button
            width={"100%"}
            activeOpacity={0.6}
            backgroundColor={APP_COLORS.secondary}
            border={APP_COLORS.secondary}
            color={APP_COLORS.white}
            title={"Cadastrar"}
            // marginTop={30}
            onPress={SubmitForm}
          />
        )}

        {isEditable && ( // Renderiza o botão de salvar apenas quando os inputs estiverem editáveis
          <Button
            width={"100%"}
            activeOpacity={0.6}
            backgroundColor={APP_COLORS.secondary}
            border={APP_COLORS.secondary}
            color={APP_COLORS.white}
            title={"Cadastrar"}
            // marginTop={-10}
            onPress={SubmitForm}
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
