import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Container } from "../../components/Container/Style";
import { Title } from "../../components/Title/Style";
import { FlatlistInfos } from "../../components/FlatlistUsers/FlatlistUsers";
// import { ClinicData } from '../../utils/MockDataClinics'
import { CardUser } from "../../components/FlatlistUsers/CardFlatlistUsers";
import { APP_COLORS } from "../../utils/App_colors";
import { Button } from "../../components/Button/Button";
import { UnderlinedLink } from "../../components/Links/Style";
import api, { ClinicResource } from "../../service/service";
import { Text } from "react-native";

export const ContainerScrollView = styled.ScrollView`
  width: 90%;
  display: flex;
`;

export default function ChooseClinic({ navigation, route }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [infosClinic, setInfosClinic] = useState({});
  const { clinicas, cidade, botaoSelecionado } = route.params;

  console.log("clinas da tela antiga");
  console.log(clinicas);
  console.log(cidade);
  console.log(botaoSelecionado);

  console.log(selectedCard);

  const handleCardPress = (id) => {
    setSelectedCard(id);
  };

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
  }, []);

  return (
    <Container>
      <Title marginTop={60}>Selecionar clínica</Title>

      <ContainerScrollView>
        {infosClinic.length === 0 ? (
          <Text>Não há clinicas para essa região!</Text>
        ) : (
          <FlatlistInfos
            width={"100%"}
            data={infosClinic}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <CardUser
                //   imageUser={require("../../assets/Images/Group.png")}
                  nameUser={item.nomeFantasia}
                  descriptionUser={item.endereco.logradouro}
                  schedulingTime={item.horarioFuncionamento}
                  iconName={"calendar"}
                  iconSize={20}
                  bgColor={item.situation}
                  clinicAvaliation={"5.0"}
                  marginLeftInfoUser={"-15px"}
                  isClinic={true}
                  widthImage={60}
                  heightImage={53}
                  marginTopImage={15}
                  isSelected={selectedCard === item.id}
                  onPressBorder={() => handleCardPress(item.id)}
                  marginBottomCard={0}
                />
              );
            }}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ContainerScrollView>

      <Button
        marginTop={50}
        activeOpacity={0.6}
        backgroundColor={APP_COLORS.secondary}
        border={APP_COLORS.secondary}
        color={APP_COLORS.white}
        width={"90%"}
        title={"Continuar"}
        onPress={() => navigation.navigate("ChoseDoctor", {
            cidade: cidade,
            clinicas: clinicas,
            botaoSelecionado: botaoSelecionado,
            clinicaSelecionada: selectedCard
        })}
      />

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
