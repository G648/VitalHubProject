import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { CalendarHome } from "../../components/Calendar/Calendar";
import { Container } from "../../components/Container/Style";
import { ContainerView } from "../../components/Buttons/Buttons";
import { Button } from "../../components/Button/Button";
import { APP_COLORS } from "../../utils/App_colors";
import { FlatlistInfos } from "../../components/FlatlistUsers/FlatlistUsers";
import { CardUser } from "../../components/FlatlistUsers/CardFlatlistUsers";
import { MockData } from "../../utils/MockData";
import { CardSituation } from "../../utils/AppSituationCard";
import CancelDialogs from "../../components/Dialogs/CalcelDialogs";
import { SeeMedicalDialog } from "../../components/Dialogs/SeeMedicalDialog";
import { userDecodeToken } from "../../utils/Auth";
import api from "../../service/service";
import { Text } from "react-native";
import moment from "moment";
import { TextConsultas } from "../Patient/PatientHome";

const DoctorHome = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState(CardSituation.scheduled);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalMedical, setisModalMedical] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});
  const [emailUser, setEmailUser] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [fotoUser, setFotoUser] = useState("");
  const [dataConsulta, setDataConsulta] = useState([]);

  const [consultas, setConsultas] = useState([]);

  const handleCardPress = (selectedSituation, userData) => {
    selectedSituation == "Pendentes"
      ? setIsModalCancel(true)
      : setisModalMedical(true);
    setSelectedUserData(userData);

    // console.log(selectedUserData);
  };

  const calcularIdade = (dataNascimento) => {
    const hoje = moment();
    const dataNasc = moment(dataNascimento);
    const anos = hoje.diff(dataNasc, "years");
    return anos;
  };

  function FormatData(date) {
    const moment = require("moment");

    const horaConsulta = moment(date).format("HH:mm");

    return <Text> {horaConsulta} </Text>;
  }

  const verifyPriorityLevels = (priority) => {
    switch (priority) {
      case 1:
        return <Text>Rotina</Text>;

        break;
      case 2:
        return <Text>Exame</Text>;
        break;
      case 3:
        return <Text> Urgência </Text>;
        break;
      default:
        return <Text> Sem precêdencia</Text>;
        break;
    }
  };

  async function GetDoctorAppointmentFunction() {
    try {
      const data = await userDecodeToken();

      const url = data.role == "Medico" ? "Medicos" : "Pacientes";

      const retorno = await api.get(
        `/api/${url}/BuscarPorData?data=${dataConsulta}&id=${data.jti}`
      );

      setConsultas(retorno.data);

    } catch (error) {
      console.log("erro", error);
    }
  }

  async function GetByIdUser() {
    try {
      const response = await api.get(`/api/Medicos/BuscarPorId?id=${idUser}`);

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

  useEffect(() => {
    profileLoad();

    if (dataConsulta != "") {
      GetDoctorAppointmentFunction();
    }
  }, [dataConsulta]);

  console.log(consultas);
  // console.log(`user data: ${selectedUserData}`);
  console.log("user data:", JSON.stringify(selectedUserData));

  useEffect(() => {
    GetByIdUser();
  });
  return (
    <Container>
      <Header
        sourcePhoto={fotoUser}
        textValue={"Bem vindo!"}
        nameDoctor={nomeUser}
        navigation={navigation}
      />

      <CalendarHome
        dataConsulta={dataConsulta}
        setDataConsulta={setDataConsulta}
      />

      <ContainerView>
        <Button
          width={"32%"}
          activeOpacity={0.8}
          title={"Pendentes"}
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
          title={"Realizados"}
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
          title={"Cancelados"}
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
                  imageUser={item.paciente.idNavigation.foto}
                  nameUser={item.paciente.idNavigation.nome}
                  ageUser={
                    calcularIdade(item.paciente.dataNascimento) + " anos" + "  •"
                  }
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
                  imageUser={item.paciente.idNavigation.foto}
                  nameUser={item.paciente.idNavigation.nome}
                  ageUser={
                    calcularIdade(item.paciente.dataNascimento) + " anos" + "  •"
                  }
                  descriptionUser={verifyPriorityLevels(
                    item.prioridade.prioridade
                  )}
                  iconName={"clockcircle"}
                  bgColor={item.situacao.situacao}
                  schedulingTime={FormatData(item.dataConsulta)}
                  key={item.id}
                  situation={item.situacao.situacao}
                  onPress={() => {
                    navigation.push("MedicalRecord",
                      {
                        consultaId: selectedUserData.id,
                        foto: selectedUserData.medicoClinica.medico.idNavigation.foto,
                        nomeMedico: selectedUserData.medicoClinica.medico.idNavigation.nome,
                        crm: selectedUserData.medicoClinica.medico.crm,
                        especialidade: selectedUserData.medicoClinica.medico.especialidade.especialidade1,
                        descricao: selectedUserData.descricao,
                        diagnostico: selectedUserData.diagnostico
                      }
                    )
                  }}
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
                  imageUser={item.paciente.idNavigation.foto}
                  nameUser={item.paciente.idNavigation.nome}
                  ageUser={
                    calcularIdade(item.paciente.dataNascimento) + " anos" + "  •"
                  }
                  descriptionUser={verifyPriorityLevels(
                    item.prioridade.prioridade
                  )}
                  iconName={"clockcircle"}
                  bgColor={item.situacao.situacao}
                  schedulingTime={FormatData(item.dataConsulta)}
                  key={item.id}
                  situation={item.situacao.situacao}
                  onPressBorder={() =>
                    item.situacao.situacao === "Cancelados"
                      ? handleCardPress(selectedButton, item)
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

      {/* Renderiza o Dialogs quando isModalVisible for true */}
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
        // imageUser={
        //   selectedUserData != null &&
        //   selectedUserData.idNavigation.foto
        // }
        showCancelButton={true}
        onPressCancel={() => setisModalMedical(false)}
        heightImageUser={250}
        widthImageUser={320}
        // nameUser={selectedUserData.paciente.idNavigation.nome}
        ageUser={`   ${calcularIdade(
          // selectedUserData.paciente.dataNascimento
        )} anos`}
        // emailuser={selectedUserData.paciente.idNavigation.email}
        titleButton={"Inserir prontuário"}
        onPress={() => {
          navigation.navigate("MedicalRecord");
          setisModalMedical(false);
          //enviar os dados para a página de medicalRecords
          navigation.navigate("MedicalRecord", { userData: selectedUserData });
        }}
        widtContainerInfoUser={280}
        marginBottomName={"30px"}
      />
    </Container>
  );
};

export default DoctorHome;
