import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container/Style'
import { ContainerScrollView } from './ChooseClinic'
import { Title } from '../../components/Title/Style'
// import { DoctorData } from '../../utils/MockDataDoctor'
import { FlatlistInfos } from '../../components/FlatlistUsers/FlatlistUsers'
import { CardUser } from '../../components/FlatlistUsers/CardFlatlistUsers'
import { Button } from '../../components/Button/Button'
import { APP_COLORS } from '../../utils/App_colors'
import { UnderlinedLink } from '../../components/Links/Style'
import api, { DoctorResource } from '../../service/service'

export default function ChoseDoctor({ navigation }) {

  const [selectedCard, setSelectedCard] = useState(null);
  const [doctorList, setDoctorList] = useState([])

  const getDoctor = async () => {
    await api.get(DoctorResource)
      .then(response => {
        setDoctorList(response.data)
      })
      .catch(error => console.log(error));
  }

  const handleCardPress = (id) => {
    setSelectedCard(id);
  };

  useEffect(() => {
    getDoctor()
  }, [])

  return (
    <Container>
      <Title
        marginTop={60}
      >
        Selecionar Médico
      </Title>
      <ContainerScrollView>

        <FlatlistInfos
          width={'100%'}
          data={doctorList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <CardUser
                imageUser={item.foto}
                nameUser={item.idNavigation.nome}
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
            )
          }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      </ContainerScrollView>

      <Button
        marginTop={50}
        activeOpacity={.6}
        backgroundColor={APP_COLORS.secondary}
        border={APP_COLORS.secondary}
        color={APP_COLORS.white}
        width={"90%"}
        title={'Continuar'}
        onPress={() => navigation.navigate("ChooseDate")}
      />

      <UnderlinedLink
        ColorText={APP_COLORS.secondary}
        buttonAlign={'center'}
        buttonOpacity={.6}
        textIntput={'Cancelar'}
        onClick={() => navigation.navigate("HomePatient")}
      />
    </Container>
  )
}