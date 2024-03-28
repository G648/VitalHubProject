import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Container } from '../../components/Container/Style'
import { Title } from '../../components/Title/Style'
import { FlatlistInfos } from '../../components/FlatlistUsers/FlatlistUsers'
// import { ClinicData } from '../../utils/MockDataClinics'
import { CardUser } from '../../components/FlatlistUsers/CardFlatlistUsers'
import { APP_COLORS } from '../../utils/App_colors'
import { Button } from '../../components/Button/Button'
import { UnderlinedLink } from '../../components/Links/Style'
import api, { ClinicResource } from '../../service/service'

export const ContainerScrollView = styled.ScrollView`
    width: 90%;
    display:flex;
`

export default function ChooseClinic({ navigation }) {

    const [selectedCard, setSelectedCard] = useState(null);
    const [clinicList, setClinicList] = useState([])

    const getClinic = async () => {
        await api.get(ClinicResource)
          .then(response => {
            setClinicList(response.data)
          })
          .catch(error => console.log(error));
      }

    const handleCardPress = (id) => {
        setSelectedCard(id);
    };

    useEffect(() => {
        getClinic()
      }, [])

    console.log(clinicList);
    return (
        <Container>
            <Title
                marginTop={60}
            >
                Selecionar clínica
            </Title>

            <ContainerScrollView>
                <FlatlistInfos
                    width={'100%'}
                    data={clinicList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <CardUser
                                imageUser={require('../../assets/Images/Group.png')}
                                nameUser={item.nomeFantasia}
                                descriptionUser={item.endereco.logradouro}
                                schedulingTime={item.horarioFuncionamento}
                                iconName={"calendar"}
                                iconSize={20}
                                bgColor={item.situation}
                                clinicAvaliation={item.classificacao}
                                marginLeftInfoUser={"-15px"}
                                isClinic={true}
                                widthImage={60}
                                heightImage={53}
                                marginTopImage={15}
                                isSelected={selectedCard === item.id}
                                onPressBorder={() => handleCardPress(item.id)}
                                marginBottomCard={0}
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
                onPress={() => navigation.navigate("ChoseDoctor")}
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