import React, { useEffect, useState } from "react";
import { Container } from "../../components/Container/Style";
import { ContainerScrollView } from "./ChooseClinic";
import { Title } from "../../components/Title/Style";
// import { DoctorData } from '../../utils/MockDataDoctor'
import { FlatlistInfos } from "../../components/FlatlistUsers/FlatlistUsers";
import { CardUser } from "../../components/FlatlistUsers/CardFlatlistUsers";
import { Button } from "../../components/Button/Button";
import { APP_COLORS } from "../../utils/App_colors";
import { UnderlinedLink } from "../../components/Links/Style";
import api, { DoctorResource } from "../../service/service";

export default function ChoseDoctor({ navigation, route }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [doctorList, setDoctorList] = useState([]);
  const [doctorName, setDoctorName] = useState("")
  const [doctorEspecialidade, setDoctorEspecialidade] = useState("")

  console.log(doctorName, doctorEspecialidade)
  console.log(doctorList);

  const { cidade, clinicas, botaoSelecionado, clinicaSelecionada } =
    route.params;

  const getDoctor = async () => {
    await api
      .get(`/api/Medicos/BuscarPorIdClinica?id=${clinicaSelecionada}`)
      .then((response) => {
        setDoctorList(response.data);
        setDoctorName(response.data[0].idNavigation.nome)
        setDoctorEspecialidade(response.data[0].especialidade.especialidade1)
      })
      .catch((error) => console.log(error));
  };

  const handleCardPress = (id) => {
    setSelectedCard(id);
  };

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <Container>
      <Title marginTop={60}>Selecionar Médico</Title>
      <ContainerScrollView>
        <FlatlistInfos
          width={"100%"}
          data={doctorList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <CardUser
                imageUser={item.idNavigation.foto}
                nameUser={"Dr. " + item.idNavigation.nome}
                ageUser={"CRM " + item.crm}
                descriptionUser={item.especialidade.especialidade1}
                marginLeftInfoUser={-15}
                widthImage={100}
                heightImage={100}
                marginTopImage={1}
                isSelected={selectedCard === item.id}
                onPressBorder={() => handleCardPress(item.id)}
                marginBottomCard={0}
                isDoctor={true}
              />
            );
          }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      </ContainerScrollView>

      <Button
        marginTop={50}
        activeOpacity={0.6}
        backgroundColor={APP_COLORS.secondary}
        border={APP_COLORS.secondary}
        color={APP_COLORS.white}
        width={"90%"}
        title={"Continuar"}
        onPress={() =>
          navigation.navigate("ChooseDate", {
            cidade: cidade,
            clinicas: clinicas,
            botaoSelecionado: botaoSelecionado,
            clinicaSelecionada: clinicaSelecionada,
            doutorSelecionado: selectedCard,
            nomeDoutor : doctorName,
            especialidadeDoutor:doctorEspecialidade,
          })
        }
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
