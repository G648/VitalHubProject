import { Calendar } from "react-native-calendars";
import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Style";
import { Title } from "../../components/Title/Style";
import { APP_COLORS } from "../../utils/App_colors";
import { FontAwesome } from "@expo/vector-icons";
import {
  SelectedList,
  ViewSelectedList,
} from "../../components/Dialogs/ScheduleAppointment";
import { TextLabel } from "../Doctor/MedicalRecord";
import { UnderlinedLink } from "../../components/Links/Style";
import { Button } from "../../components/Button/Button";
import CancelDialogs from "../../components/Dialogs/CalcelDialogs";
import moment from "moment";
import { ActivityIndicator } from "react-native";
import api from "../../service/service";

export default function ChooseDate({ navigation, route }) {
  const [currentDate, setCurrentDate] = useState("");
  const [isModalScheduleVisible, setIsModalScheduleVisible] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState();
  const [arrayOptions, setArrayOptions] = useState(null);
  const dataAtual = moment().format("YYYY-MM-DD");
  const [hora, setHora] = useState("");

  //TODO:FazerRequisiçãode doutor para capturar o medicoClinicaId

  const {
    cidade,
    clinicas,
    botaoSelecionado,
    clinicaSelecionada,
    doutorSelecionado,
    nomeDoutor,
    especialidadeDoutor,
    pacienteId
  } = route.params;

  const dataHoraSelecionada = dataAtual + " " + hora;

  const parametros = {
    situacaoId : "B2A29251-975A-46CA-8A41-D82AD95512DA",
    cidade,
    clinicas,
    botaoSelecionado,
    clinicaSelecionada,
    doutorSelecionado,
    nomeDoutor,
    especialidadeDoutor,
    dataHoraSelecionada,
    pacienteId
  };

  console.log(parametros);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    setCurrentDate(date + "/" + month + "/" + year);
  }, []);

  function formatarData(data) {
    // Formatar a data usando Moment.js
    return moment(data).format("D [de] MMMM [de] YYYY");
  }

  function LoadOptions() {
    //Conferir quantas horas faltam até as 24h
    const horasRestantes = moment(dataAtual)
      .add(24, "hours")
      .diff(moment(), "hours");
    //criar um laço que rode a quatidade de horas que faltam
    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + (index + 1);

      return {
        label: `${valor}:00`,
        value: `${valor}:00`,
      };
    });
    //devolver para cada hora, uma nova opção no select
    setArrayOptions(options);
  }

  function handleScheduling() {
    setIsModalScheduleVisible(true);
  }

  async function handleGoBackPage() {
    try {
      await api.post("/api/Consultas/Cadastrar", parametros, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }

    await setIsModalScheduleVisible(false);
    navigation.navigate("HomePatient");
  }

  useEffect(() => {
    LoadOptions();
  }, []);

  return (
    <Container>
      <Title marginTop={60}>Selecionar Data</Title>

      <Calendar
        setDataSelecionada={setDataSelecionada}
        dataSelecionada={dataSelecionada}
        onDayPress={(day) => {
          setDataSelecionada(day.dateString);
        }}
        current={currentDate}
        markedDates={{
          [dataSelecionada]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
        style={{
          backgroundColor: APP_COLORS.white,
          width: 380,
        }}
      />

      <ViewSelectedList marginTopList={60}>
        <TextLabel marginLeftLabel={15}>
          Selecione um horário disponível
        </TextLabel>
        {arrayOptions != null ? (
          <SelectedList
            data={arrayOptions}
            placeholder={"Selecionar horário"}
            setSelected={(value) => setHora(value)}
            save={"value"}
            search={false}
            // onSelect={hora}
            boxStyles={{
              borderColor: APP_COLORS.primary,
              borderWidth: 2,
              height: 60,
              alignItems: "center",
              marginHorizontal: 10,
              marginTop: 20,
            }}
            dropdownStyles={{
              backgroundColor: "white",
              position: "absolute",
              top: 60,
              right: 9.8,
              width: "94.9%",
              height: "80px",
              zIndex: 1,
              borderColor: APP_COLORS.primary,
              borderWidth: "2px",
              borderRadius: 5,
              borderWidth: 2,
              borderTopWidth: 0,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
            fontFamily="MontserratAlternates_600SemiBold"
            dropdownTextStyles={{
              color: APP_COLORS.primaryV1,
            }}
            inputStyles={{
              color: APP_COLORS.primaryV1,
            }}
            arrowicon={
              <FontAwesome
                name="caret-down"
                size={24}
                color={APP_COLORS.primaryV1}
              />
            }
          />
        ) : (
          <ActivityIndicator />
        )}
      </ViewSelectedList>

      <Button
        title={"Continuar"}
        activeOpacity={0.8}
        border={APP_COLORS.secondary}
        backgroundColor={APP_COLORS.secondary}
        color={APP_COLORS.white}
        marginTop={100}
        width={"95%"}
        onPress={() => handleScheduling()}
      />

      {/* Renderiza o Dialogs quando isModalVisible for true */}
      {isModalScheduleVisible && (
        <CancelDialogs
          isVisible={isModalScheduleVisible}
          bgColor={APP_COLORS.grayV6}
          titleContent={"Agendar consulta"}
          customContent={"Consulte os dados selecionados para a sua consulta"}
          fontSizeText={"22px"}
          fontSizeTextParagraf={"15px"}
          onPressConfirm={() => {
            handleGoBackPage();
          }}
          onPressCancel={() => {
            setIsModalScheduleVisible(false);
          }}
          showCancelButton={true}
          isModalScheduling={true}
          dataConsulta={formatarData(dataSelecionada)}
          horaConsulta={hora}
          nomeMedico={"Dr. " + nomeDoutor}
          especialidadeMedico={"Especialidade: " + especialidadeDoutor}
          localConsulta={cidade}
          tipoConsulta={botaoSelecionado}
        />
      )}

      <UnderlinedLink
        ColorText={APP_COLORS.secondary}
        buttonAlign={"center"}
        buttonOpacity={0.6}
        textIntput={"Cancelar"}
        onClick={() => navigation.navigate("HomePatient")}
      />
    </Container>
  );
}
