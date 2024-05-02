import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { CalendarHome } from "../../components/Calendar/Calendar";
import { Container } from "../../components/Container/Style";
import { ContainerView } from "../../components/Buttons/Buttons";
import { Button } from "../../components/Button/Button";
import { APP_COLORS } from "../../utils/App_colors";
import { FlatlistInfos } from "../../components/FlatlistUsers/FlatlistUsers";
import { CardUser } from "../../components/FlatlistUsers/CardFlatlistUsers";
import { CardSituation } from "../../utils/AppSituationCard";
import CancelDialogs from "../../components/Dialogs/CalcelDialogs";
import { SeeMedicalDialog } from "../../components/Dialogs/SeeMedicalDialog";
import { userDecodeToken } from "../../utils/Auth";
import api from "../../service/service";
import { Text } from "react-native";
import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";
import ScheduleAppointment from "../../components/Dialogs/ScheduleAppointment";

export const ScheduledButton = styled.TouchableOpacity`
  background-color: ${APP_COLORS.primary};
  width: 60px;
  height: 60px;
  color: ${APP_COLORS.white};
  border-radius: 8px;
  elevation: 9px;
  position: absolute;
  bottom: 2%; /* Ajuste conforme necessário */
  left: 80%;
  align-items: center;
  justify-content: center;
`;

export const TextConsultas = styled.Text`
  color: ${APP_COLORS.grayV4};
  font-family: "Quicksand_400Regular";
`;

const DoctorHome = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState(CardSituation.scheduled);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalMedical, setisModalMedical] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [isModalScheduleVisible, setIsModalScheduleVisible] = useState(false);
  const [selectedInput, setSelectedInput] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");
  const [consultas, setConsultas] = useState([]);
  // const [agendamento, setAgendamento] = useState(null);
  const [idUser, setIdUser] = useState("");
  const [fotoUser, setFotoUser] = useState("");
  const [cidade, setCidade] = useState("");
  const [infosClinic, setInfosClinic] = useState({})

  console.log("CIDADEEEEEEEEEEEEEEEEEEEEEE");
  console.log(infosClinic);

  const handleCardPress = (selectedSituation, userData) => {
    selectedSituation == "Pendentes"
      ? setIsModalCancel(true)
      : setisModalMedical(true);

    setSelectedUserData(userData);
  };

  const verifyPriorityLevels = (priority) => {
    switch (priority) {
      case 1:
        return <Text>Rotina</Text>;
      case 2:
        return <Text>Exame</Text>;
      case 3:
        return <Text> Urgência </Text>;
      default:
        return <Text> Sem precêdencia</Text>;
    }
  };

  function FormatData(date) {
    const moment = require("moment");

    const horaConsulta = moment(date).format("HH:mm");

    return <Text> {horaConsulta} </Text>;
  }

  async function GetPatientAppointmentFunction() {
    try {
      const data = await userDecodeToken();
      const url = data.role == "Medico" ? "Medicos" : "Pacientes";

      const response = await api.get(
        `/api/${url}/BuscarPorData?data=${dataConsulta}&id=${data.jti}`
      );

      setConsultas(response.data);
    } catch (error) {
      console.log("erro", error);
    }
  }

  async function GetByIdUser() {
    try {
      const response = await api.get(`/api/Pacientes/BuscarPorId?id=${idUser}`);

      setFotoUser(response.data.idNavigation.foto);
    } catch (error) {
      console.log("deu ruim na requição de usuario por ID");
      console.log(error.request);
    }
  }

  async function profileLoad() {
    try {
      const token = await userDecodeToken();

      if (token) {
        setEmailUser(token.email);
        setNomeUser(token.name);
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

  async function GetClinics() {
    try {
      const cidadeEncoded = encodeURIComponent(cidade).trim();
      const response = await api.get(
        `/api/Clinica/BuscarPorCidade?cidade=${cidadeEncoded}`
      );

        setInfosClinic(response.data);

      console.log("CIDADES E CLINICAS");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetClinics();
  },[]);

  useEffect(() => {
    profileLoad();

    if (dataConsulta != "") {
      GetPatientAppointmentFunction();
    }
  }, [dataConsulta]);

  useEffect(() => {
    GetByIdUser();
  });

  return (
    <Container>
      <Header
        sourcePhoto={fotoUser}
        textValue={"Bem vindo!"}
        nameDoctor={"Dr. " + nomeUser}
      />

      <CalendarHome
        dataConsulta={dataConsulta}
        setDataConsulta={setDataConsulta}
      />

      <ContainerView>
        <Button
          width={"32%"}
          activeOpacity={0.8}
          title={"Agendadas"}
          border={APP_COLORS.secondaryV2}
          color={selectedButton == "Pendentes" ? "white" : APP_COLORS.secondary}
          backgroundColor={
            selectedButton === "Pendentes"
              ? APP_COLORS.secondary
              : "transparent"
          }
          onPress={() => setSelectedButton("Pendentes")}
        />
        <Button
          width={"32%"}
          activeOpacity={0.8}
          title={"Realizadas"}
          border={APP_COLORS.secondaryV2}
          color={
            selectedButton == "Realizados" ? "white" : APP_COLORS.secondary
          }
          backgroundColor={
            selectedButton === "Realizados"
              ? APP_COLORS.secondary
              : "transparent"
          }
          onPress={() => setSelectedButton("Realizados")}
        />
        <Button
          width={"32%"}
          activeOpacity={0.8}
          title={"Canceladas"}
          border={APP_COLORS.secondaryV2}
          color={
            selectedButton == "Cancelados" ? "white" : APP_COLORS.secondary
          }
          backgroundColor={
            selectedButton === "Cancelados"
              ? APP_COLORS.secondary
              : "transparent"
          }
          onPress={() => setSelectedButton("Cancelados")}
        />
      </ContainerView>

      {consultas.length > 0 ? (
        <FlatlistInfos
          data={consultas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (
              selectedButton === "Pendentes" &&
              item.situacao.situacao === "Pendentes"
            ) {
              return (
                <CardUser
                  imageUser={item.medicoClinica.medico.idNavigation.foto}
                  nameUser={item.medicoClinica.medico.idNavigation.nome}
                  ageUser={item.medicoClinica.medico.crm}
                  descriptionUser={verifyPriorityLevels(
                    item.prioridade.prioridade
                  )}
                  iconName={"clockcircle"}
                  bgColor={item.situacao.situacao}
                  schedulingTime={FormatData(item.dataConsulta)}
                  key={item.id}
                  situation={item.situacao.situacao}
                  onPressBorder={() =>
                    item.situacao.situacao === "Pendentes"
                      ? handleCardPress(selectedButton, item)
                      : null
                  }
                />
              );
            } else if (
              selectedButton === "Realizados" &&
              item.situacao.situacao === "Realizados"
            ) {
              return (
                <CardUser
                  imageUser={item.medicoClinica.medico.idNavigation.foto}
                  nameUser={item.medicoClinica.medico.idNavigation.nome}
                  ageUser={item.medicoClinica.medico.crm}
                  descriptionUser={verifyPriorityLevels(
                    item.prioridade.prioridade
                  )}
                  iconName={"clockcircle"}
                  bgColor={item.situacao.situacao}
                  schedulingTime={FormatData(item.dataConsulta)}
                  key={item.id}
                  situation={item.situacao.situacao}
                  onPressBorder={() =>
                    item.situacao.situacao === "Realizados"
                      ? handleCardPress(selectedButton, item)
                      : null
                  }
                />
              );
            } else if (
              selectedButton === "Cancelados" &&
              item.situacao.situacao === "Cancelados"
            ) {
              return (
                <CardUser
                  imageUser={item.medicoClinica.medico.idNavigation.foto}
                  nameUser={item.medicoClinica.medico.idNavigation.nome}
                  ageUser={item.medicoClinica.medico.crm}
                  descriptionUser={verifyPriorityLevels(
                    item.prioridade.prioridade
                  )}
                  iconName={"clockcircle"}
                  key={item.id}
                  bgColor={item.situacao.situacao}
                  iconColor={item.situacao.situacao}
                  schedulingTime={FormatData(item.dataConsulta)}
                  situation={item.situacao.situacao}
                  onPressBorder={() =>
                    item.situacao.situacao === "Cancelados"
                      ? handleCardPress(selectedButton, JSON.parse(item))
                      : null
                  }
                />
              );
            }
          }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <TextConsultas>
          Nenhum agendamento encontrado para esta data!
        </TextConsultas>
      )}

      {/* Renderiza o Dialogs quando  ModalVisible for true */}
      {isModalCancel && (
        <CancelDialogs
          isVisible={isModalCancel}
          bgColor={APP_COLORS.grayV6}
          titleContent={"Cancelar consulta"}
          customContent={
            "Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?"
          }
          fontSizeText={"22px"}
          fontSizeTextParagraf={"15px"}
          onPressConfirm={() => {
            setIsModalCancel(false);
          }}
          onPressCancel={() => {
            setIsModalCancel(false);
          }}
          showCancelButton={true}
        />
      )}

      <SeeMedicalDialog
        isVisible={isModalMedical}
        imageUser={
          selectedUserData != null &&
          selectedUserData.medicoClinica.medico.idNavigation.foto
        }
        nameUser={
          selectedUserData != null &&
          selectedUserData.medicoClinica.medico.idNavigation.nome
        }
        ageUser={
          selectedUserData != null && selectedUserData.medicoClinica.medico.crm
        }
        emailuser={
          selectedUserData != null &&
          selectedUserData.medicoClinica.medico.especialidade.especialidade1
        }
        heightImageUser={250}
        widthImageUser={320}
        showCancelButton={true}
        onPressCancel={() => setisModalMedical(false)}
        titleButton={"Ver local da consulta".toUpperCase()}
        onPress={() => {
          setisModalMedical(false);
          navigation.navigate("MapViewLocation", {
            MapData: selectedUserData.medicoClinica.clinica.endereco,
          });
        }}
        widtContainerInfoUser={180}
        marginBottomName={"15px"}
      />

      <ScheduledButton
        activeOpacity={0.8}
        onPress={() => setIsModalScheduleVisible(true)}
      >
        <FontAwesome5 name="stethoscope" size={32} color={APP_COLORS.white} />
      </ScheduledButton>

      {isModalScheduleVisible && (
        <ScheduleAppointment
          widthModal={"100%"}
          heightModal={600}
          titleContent={"Agendar consulta"}
          justifyContentModal={"flex-end"}
          fontSizeText={25}
          placeholder={"tipo de consulta"}
          mockdata={consultas}
          save={"value"}
          setSelectedType={setSelectedInput}
          onSelected={selectedInput}
          onChangeText={(txt) => setCidade(txt)}
          cancelDialog={() => setIsModalScheduleVisible(false)}
          onClick={async () => {
            await setIsModalScheduleVisible(false);
            navigation.push("ChooseClinic", {
              clinicas: infosClinic,
            });
            // setAgendamento({
            //   ...agendamento, //manter todas as alterações existentes dentro do state
            //   prioridadeId: item.Id,
            //   prioridadeLabel: item.tipo,
            //   //alterar o tipo para rotina exame e urgência
            // });
          }}
          // setDefault={}
        />
      )}
    </Container>
  );
};

export default DoctorHome;
