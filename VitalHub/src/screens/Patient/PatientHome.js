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
import { Alert, Text } from "react-native";
import moment from "moment";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const DoctorHome = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState(CardSituation.scheduled);
    const [filteredData, setFilteredData] = useState(MockData);
    const [isModalCancel, setIsModalCancel] = useState(false);
    const [isModalMedical, setisModalMedical] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState({});
    const [emailUser, setEmailUser] = useState("");
    const [nomeUser, setNomeUser] = useState("");
    const [dataConsulta, setDataConsulta] = useState('');

    const [consultas, setConsultas] = useState([])

    const handleCardPress = (selectedSituation, userData) => {
        selectedSituation == "Pendentes"
            ? setIsModalCancel(true)
            : setisModalMedical(true);
        setSelectedUserData(userData);
    };

    // function getMissingQuery() {
    //     try {
    //         const date = new Date();
    //         // const today = date.getDate();
    //         // setDataConsulta(response.data)
    //         // console.log(date);
    //         // console.log(dataConsulta);

    //         if (moment(date).isAfter(dataConsulta)) {
    //             // console.log("sim");
    //             (item) => item.id.situacao.situacao === CardSituation.carriedOut
    //         }
    //         else {
    //             console.log("não existe nenhuma consulta!");

    //         }
    //         // return today;
    //     } catch (error) {
    //         console.log("error", error);
    //         return null;
    //     }
    // }

    // function getAge() {
    //     try {
    //         const date = new Date();

    //         if (moment(date).isAfter(dataConsulta)) {
    //             console.log("sim");
    //         }
    //         else {
    //             console.log("no");
    //         }
    //         // return today;
    //     } catch (error) {
    //         console.log("error", error);
    //         return null;
    //     }
    // }


    async function GetPatientAppointmentFunction() {
        try {
            const data = await userDecodeToken()
            const url = (data.role == 'Medico' ? "Medicos" : "Pacientes")

            const response = await api.get(
                `/api/${url}/BuscarPorData?data=${dataConsulta}&id=${data.jti}`);

            setConsultas(response.data);
            console.log(response.data);
        } catch (error) {
            console.log("erro", error);
        }
    }

    async function profileLoad() {
        try {
            const token = await userDecodeToken();

            if (token) {
                setEmailUser(token.email);
                setNomeUser(token.name);
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

    // useEffect(() => {
    //     getMissingQuery();
    // })

    useEffect(() => {
        profileLoad();

        if (dataConsulta != "") {
            GetPatientAppointmentFunction();
        }
    }, [dataConsulta]);

    // useEffect(() => {
    //     // let newData = [consultas];

    //     data={consultas}

    //     switch (selectedButton) {
    //       case "Agendadas":

    //           (item) => item.situation === CardSituation.scheduled

    //         break;
    //       case "Realizadas":

    //           (item) => item.situation === CardSituation.carriedOut

    //         break;
    //       case "Canceladas":

    //           (item) => item.situation === CardSituation.canceled

    //         break;
    //       default:
    //         newData = consultas;
    //         break;
    //     }

    //     setFilteredData(newData);
    //   }, [selectedButton]);


    return (
        <Container>
            <Header textValue={"Bem vindo!"} nameDoctor={nomeUser} />

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

            <FlatlistInfos
                data={consultas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {

                    if (selectedButton === 'Pendentes' && item.situacao.situacao === "Pendentes") {
                        return (
                            <CardUser
                                imageUser={'sadhfjnghajwkne'}
                                nameUser={item.medicoClinica.medico.idNavigation.nome}
                                ageUser={item.medicoClinica.medico.crm}
                                descriptionUser={item.prioridade.prioridade}
                                iconName={"clockcircle"}
                                bgColor={item.situacao.situacao}
                                schedulingTime={'14:00'}
                                key={item.id}
                                situation={item.situacao.situacao}
                                onPress={() => handleCardPress(selectedButton, item)}
                                onPressBorder={() => item.situation === "Pendentes" ? handleCardPressInfoDoctor(selectedButton, item) : null}
                            />)
                    }
                    else if (selectedButton === 'Realizados' && item.situacao.situacao === "Realizados") {
                        return (
                            <CardUser
                                imageUser={'sadhfjnghajwkne'}
                                nameUser={item.medicoClinica.medico.idNavigation.nome}
                                ageUser={item.medicoClinica.medico.crm}
                                descriptionUser={item.prioridade.prioridade}
                                iconName={"clockcircle"}
                                bgColor={item.situacao.situacao}
                                schedulingTime={'14:00'}
                                key={item.id}
                                situation={item.situacao.situacao}
                                onPress={() => handleCardPress(selectedButton, item)}
                                onPressBorder={() => item.situation === "Realizados" ? handleCardPressInfoDoctor(selectedButton, item) : null}
                            />)
                    }
                    else if (selectedButton === 'Cancelados' && item.situacao.situacao === "Cancelados") {
                        return (
                            <CardUser
                                imageUser={'sadhfjnghajwkne'}
                                nameUser={item.medicoClinica.medico.idNavigation.nome}
                                ageUser={item.medicoClinica.medico.crm}
                                descriptionUser={item.prioridade.prioridade}
                                iconName={"clockcircle"}
                                bgColor={item.situacao.situacao}
                                schedulingTime={'14:00'}
                                key={item.id}
                                situation={item.situacao.situacao}
                                onPress={() => handleCardPress(selectedButton, item)}
                                onPressBorder={() => item.situation === "Cancelados" ? handleCardPressInfoDoctor(selectedButton, item) : null}
                            />)
                    }

                }}
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
