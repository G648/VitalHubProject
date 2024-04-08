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
import moment from "moment";

const DoctorHome = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState(CardSituation.scheduled);
  const [filteredData, setFilteredData] = useState(MockData);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalMedical, setisModalMedical] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState({});
  const [emailUser, setEmailUser] = useState("");
  const [nomeUser, setNomeUser] = useState("");
  const [dataConsulta, setDataConsulta] = useState(new Date());

  console.log(dataConsulta);

  const handleCardPress = (selectedSituation, userData) => {
    selectedSituation == "Agendadas"
      ? setIsModalCancel(true)
      : setisModalMedical(true);
    setSelectedUserData(userData);
  };

  
  async function profileLoad() {
    try {
      const token = await userDecodeToken();

      if (token) {
        setEmailUser(token.email);
        setNomeUser(token.name);

        setDataConsulta(moment().format("YYYY-MM-DD"));
      } else {
        console.log("Não foi possível recuperar o token de acesso.");
      }
    } catch (error) {
      console.error(
        "Erro ao recuperar o token de acesso do AsyncStorage:",
        error
      );
    }
  };

  console.log(dataConsulta);

  async function GetDoctorAppointmentFunction() {
    try {
      const data = await userDecodeToken();

      const url = data.role == "Medico" ? "Medicos" : "Pacientes";
      
      console.log(`/api/${url}/BuscarPorData?data=${dataConsulta}&id=${data.jti}`)

      const retorno = await api.get(
        `/api/${url}/BuscarPorData?data=${dataConsulta}&id=${data.jti}`
      );

      setConsulta(retorno.data);
    } catch (error) {
      console.log("erro", error);
    }
  }

  useEffect(() => {
    profileLoad();
  });

  useEffect(() => {
    if (dataConsulta != "") {
      GetDoctorAppointmentFunction();
    }
  }, [dataConsulta]);

  useEffect(() => {
    let newData = [];

    switch (selectedButton) {
      case "Agendadas":
        newData = MockData.filter(
          (item) => item.situation === CardSituation.scheduled
        );
        break;
      case "Realizadas":
        newData = MockData.filter(
          (item) => item.situation === CardSituation.carriedOut
        );
        break;
      case "Canceladas":
        newData = MockData.filter(
          (item) => item.situation === CardSituation.canceled
        );
        break;
      default:
        newData = MockData;
        break;
    }

    setFilteredData(newData);
  }, [selectedButton]);

  return (
    <Container>
      <Header textValue={"Bem vindo!"} nameDoctor={nomeUser} />

      <CalendarHome
        setDataConsulta={setDataConsulta}
      />

      <ContainerView>
        <Button
          width={"32%"}
          activeOpacity={0.8}
          title={"Agendadas"}
          border={APP_COLORS.secondaryV2}
          color={selectedButton == "Agendadas" ? "white" : APP_COLORS.secondary}
          backgroundColor={
            selectedButton === "Agendadas"
              ? APP_COLORS.secondary
              : "transparent"
          }
          onPress={() => setSelectedButton("Agendadas")}
        />
        <Button
          width={"32%"}
          activeOpacity={0.8}
          title={"Realizadas"}
          border={APP_COLORS.secondaryV2}
          color={
            selectedButton == "Realizadas" ? "white" : APP_COLORS.secondary
          }
          backgroundColor={
            selectedButton === "Realizadas"
              ? APP_COLORS.secondary
              : "transparent"
          }
          onPress={() => setSelectedButton("Realizadas")}
        />
        <Button
          width={"32%"}
          activeOpacity={0.8}
          title={"Canceladas"}
          border={APP_COLORS.secondaryV2}
          color={
            selectedButton == "Canceladas" ? "white" : APP_COLORS.secondary
          }
          backgroundColor={
            selectedButton === "Canceladas"
              ? APP_COLORS.secondary
              : "transparent"
          }
          onPress={() => setSelectedButton("Canceladas")}
        />
      </ContainerView>

      <FlatlistInfos
        data={filteredData}
        renderItem={({ item }) => (
          <CardUser
            imageUser={{ uri: item.imagem }}  
            nameUser={item.nome}
            ageUser={item.idade}
            descriptionUser={item.situacao}
            iconName={"clockcircle"}
            bgColor={item.situation}
            schedulingTime={"14:00"}
            key={item.id}
            situation={item.situation}
            onPress={() => handleCardPress(selectedButton, item)}
          />
        )}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      />

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
        showCancelButton={true}
        onPressCancel={() => setisModalMedical(false)}
        imageUser={{ uri: selectedUserData.imagem }}
        heightImageUser={250}
        widthImageUser={320}
        nameUser={selectedUserData.nome}
        ageUser={`${selectedUserData.idade} anos`}
        emailuser={selectedUserData.email}
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
