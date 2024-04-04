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
<<<<<<< HEAD
import api, { ClinicResource } from '../../service/service'
=======
import api, { ClinicListAll } from '../../service/service'
>>>>>>> guilherme

export const ContainerScrollView = styled.ScrollView`
    width: 90%;
    display:flex;
`

export default function ChooseClinic({ navigation }) {

    const [selectedCard, setSelectedCard] = useState(null);
<<<<<<< HEAD
    const [clinicList, setClinicList] = useState([])

    const getClinic = async () => {
        await api.get(ClinicResource)
          .then(response => {
            setClinicList(response.data)
          })
          .catch(error => console.log(error));
      }
=======
    const [listClinic, setListClinic] = useState([])

    async function GetClinic() {
        await api.get(ClinicListAll)
        .then(response => {setListClinic(response.data)})
        .catch(error => console.log(error));
    }
>>>>>>> guilherme

    const handleCardPress = (id) => {
        setSelectedCard(id);
    };

    useEffect(() => {
<<<<<<< HEAD
        getClinic()
      }, [])

    console.log(clinicList);
=======
        GetClinic()
    }, [])


    console.log(listClinic);
>>>>>>> guilherme
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
<<<<<<< HEAD
                    data={clinicList}
                    keyExtractor={(item) => item.id}
=======
                    data={listClinic}
                    keyExtractor={(item) => item.id} 
>>>>>>> guilherme
                    renderItem={({ item }) => {
                        return (
                            <CardUser
                                imageUser={require('../../assets/Images/Group.png')}
                                nameUser={item.nomeFantasia}
                                descriptionUser={item.endereco.logradouro}
<<<<<<< HEAD
                                schedulingTime={item.horarioFuncionamento}
=======
                                schedulingTime={'14:00'}
>>>>>>> guilherme
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