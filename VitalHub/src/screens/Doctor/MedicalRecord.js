import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Header/Header'
// import { useRoute } from '@react-navigation/native';
import { ContainerInfoUser, Infouser, ProfileImageModal } from '../../components/Dialogs/SeeMedicalDialog';
import { ContainerTextBox } from '../../components/Dialogs/CalcelDialogs';
import { ProfileName } from '../../components/FlatlistUsers/CardFlatlistUsers';
import styled from 'styled-components/native';
import { APP_COLORS } from '../../utils/App_colors';
import { Button } from '../../components/Button/Button';
import { UnderlinedLink } from '../../components/Links/Style';


export const ContainerViewUserInfo = styled.View`
    width: ${({ width = '100%' }) => width};
    height: 100%;
    border: 2px;
`

export const ScrollViewContainer = styled.ScrollView`
    width: 90%;
    height: 100%;
    top: -7%;
    
`

export const TextLabel = styled.Text`
    color: ${({ fontColor = "black" }) => fontColor};
    font-family:  'Quicksand_600SemiBold';
    font-size: ${({ fontSize = "16px" }) => fontSize};
    text-align: start;
    width: 100%;
    margin-bottom: ${({ marginBottom }) => marginBottom};
    margin-left: ${({ marginLeftLabel = 0 }) => marginLeftLabel};
`

export const InputStyle = styled.TextInput`
    width: ${({ boxWidth = '90px' }) => boxWidth};
    height: ${({ boxHeigth = "40px" }) => boxHeigth};
    border-width: 2px;
    border-color: ${({ isEditable }) => (isEditable ? APP_COLORS.primary : APP_COLORS.lightGray)};
    border-radius: 8px;
    padding: 20px;
    background-color: ${({ isEditable }) => (isEditable ? "transparent" : APP_COLORS.lightGray)};
    margin-bottom: ${({ marginBottom = "40px" }) => marginBottom};
    margin-top: ${({ marginTop = "20px" }) => marginTop};
    font-family: "MontserratAlternates_500Medium";
`

export default function MedicalRecord({ navigation, route }) {

    // const route = useRoute();
    // const userData = route.params.userData;

    // useEffect(() => {
    //     console.log(userData);
    // })

    const [isEditable, setIsEditable] = useState(false); // Estado de edição dos inputs
    const {nomeMedico} = route.params;

    console.log(nomeMedico);

    const toggleEdit = () => {
        setIsEditable(prevState => !prevState); // Alterna entre editável e não editável
    };

    const handleSave = () => {
        setIsEditable(false); // Define todos os inputs como não editáveis ao salvar
    };

    return (
        <Container>

            <ProfileImageModal
                // source={{ uri: userData.imagem }}
                widthImageUser={"100%"}
                heightImageUser={280}
            />

            <ContainerTextBox
                padding={"5px"}
            >

                <ProfileName
                    marginBottomName={20}
                >
                    {/* {userData.nome} */}
                </ProfileName>

                <ContainerInfoUser
                    widtContainerInfoUser={"68%"}
                >
                    <Infouser>
                        {/* {`${userData.idade} anos`} */}
                    </Infouser>
                    <Infouser>
                        {/* {userData.email} */}
                    </Infouser>
                </ContainerInfoUser>
            </ContainerTextBox>

            {/*  Scroll view para informações do user */}
            <ScrollViewContainer
                showsVerticalScrollIndicator={false}
            >
                <ContainerViewUserInfo>
                    <TextLabel>
                        Descrição da consulta
                    </TextLabel>
                    <InputStyle
                        placeholderTextColor={APP_COLORS.primaryV1}
                        boxHeigth={'200px'}
                        boxWidth={"100%"}
                        borderColor={APP_COLORS.primary}
                        placeholder='Descrição'
                        textAlignVertical='top'
                        editable={isEditable}
                        isEditable={isEditable}
                    />

                    <TextLabel>
                        Diagnóstico do paciente
                    </TextLabel>
                    <InputStyle
                        placeholderTextColor={APP_COLORS.primaryV1}
                        boxHeigth={'80px'}
                        boxWidth={"100%"}
                        borderColor={APP_COLORS.primary}
                        placeholder='Prescrição médica'
                        textAlignVertical='center'
                        editable={isEditable}
                        isEditable={isEditable}
                    />

                    <TextLabel>
                        Prescrição médica
                    </TextLabel>
                    <InputStyle
                        placeholderTextColor={APP_COLORS.primaryV1}
                        boxHeigth={'200px'}
                        boxWidth={"100%"}
                        borderColor={APP_COLORS.primary}
                        placeholder='Descrição'
                        textAlignVertical='top'
                        editable={isEditable}
                        isEditable={isEditable}
                    />

                    {!isEditable && ( // Renderiza o botão de editar apenas quando os inputs não estiverem editáveis
                        <Button
                            width={"100%"}
                            activeOpacity={.6}
                            backgroundColor={APP_COLORS.secondary}
                            border={APP_COLORS.secondary}
                            color={APP_COLORS.white}
                            title={"Editar"}
                            marginTop={30}
                            onPress={toggleEdit}
                        />
                    )}

                    {isEditable && ( // Renderiza o botão de salvar apenas quando os inputs estiverem editáveis
                        <Button
                            width={"100%"}
                            activeOpacity={.6}
                            backgroundColor={APP_COLORS.secondary}
                            border={APP_COLORS.secondary}
                            color={APP_COLORS.white}
                            title={"Salvar"}
                            marginTop={-10}
                            onPress={handleSave}
                        />
                    )}

                    <UnderlinedLink
                        textIntput={"Cancelar"}
                        ColorText={APP_COLORS.secondaryV1}
                        buttonOpacity={.6}
                        onClick={() => { navigation.navigate("Home") }}

                    />

                </ContainerViewUserInfo>
            </ScrollViewContainer>

        </Container>
    )
}