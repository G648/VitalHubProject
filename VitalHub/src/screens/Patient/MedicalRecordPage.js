import React, { useState } from 'react'
import { Container } from '../../components/Container/Style'
import { useRoute } from '@react-navigation/native';
import { ProfileImageModal } from '../../components/Dialogs/SeeMedicalDialog';
import { ContainerInfoDoctor, Crm, DoctorContainerInfos, DoctorEmail, DoctorName, Especialidade } from '../Doctor/DoctorProfile';
import { DataUser } from '../../components/Header/Header';
import { InputStyle, ScrollViewContainer, TextLabel } from '../Doctor/MedicalRecord';
import { APP_COLORS } from '../../utils/App_colors';
import { Button } from '../../components/Button/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContainerView } from '../../components/Buttons/Buttons';
import { UnderlinedLink } from '../../components/Links/Style';
import { MaterialIcons } from '@expo/vector-icons';

export default function MedicalRecordPage({ navigation }) {

    const [isEditable, setIsEditable] = useState(false);
    const route = useRoute();

    const userData = route.params.userData;

    const toggleEdit = () => {
        setIsEditable(prevState => !prevState); // Alterna entre editável e não editável
    };

    const handleSave = () => {
        setIsEditable(false); // Define todos os inputs como não editáveis ao salvar
    };

    async function InserirExame() {
        const formData = new FormData();
        formData.append("ConsultaId", prontuarioUpdate.id)
        formData.append("Arquivo", {
            uri : uriCameraCapture,
            name : `image.${uriCameraCapture.split('.').pop()}`,
            type : `image/${uriCameraCapture.split('.').pop()}`
        })

        await api.post(`Exame/cadastrar`, formData, {
            header : {
                "Content-Type" : "multipart/form-data"
            }
        }).then(response => {
            setDescricaoExame( descricaoExame + "\n" + response.data.descricao )
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Container>
            <ProfileImageModal
                source={userData.imagem}
                widthImageUser={"100%"}
                heightImageUser={280}
                resizeMode='cover'
            />

            <DoctorContainerInfos>
                <DataUser>
                    <DoctorName>
                        {`${userData.nome}`}
                    </DoctorName>

                    <ContainerInfoDoctor>
                        <Crm>
                            {userData.crm}
                        </Crm>

                        <Especialidade>
                            {userData.especialidade}
                        </Especialidade>
                    </ContainerInfoDoctor>
                </DataUser>
            </DoctorContainerInfos>
            <ScrollViewContainer>
                <TextLabel>
                    Descrição da consulta
                </TextLabel>
                <InputStyle
                    placeholder='Descrição da consulta'
                    placeholderTextColor={APP_COLORS.primaryV1}
                    boxHeigth={'150px'}
                    boxWidth={"100%"}
                    borderColor={APP_COLORS.primary}
                    editable={isEditable}
                    isEditable={isEditable}
                />

                <TextLabel>
                    Diagnóstico do paciente
                </TextLabel>
                <InputStyle
                    placeholder='Infecção no ouvido'
                    placeholderTextColor={APP_COLORS.primaryV1}
                    boxHeigth={'80px'}
                    boxWidth={"100%"}
                    borderColor={APP_COLORS.primary}
                    editable={isEditable}
                    isEditable={isEditable}
                />

                <TextLabel>
                    Prescrição médica
                </TextLabel>
                <InputStyle
                    placeholder='Medicamento: Advil
                    Dosagem: 50 mg
                    Frequência: 3 vezes ao dia
                    Duração: 3 dias'
                    placeholderTextColor={APP_COLORS.primaryV1}
                    boxHeigth={'150px'}
                    boxWidth={"100%"}
                    borderColor={APP_COLORS.primary}
                    editable={isEditable}
                    isEditable={isEditable}
                />

                <TextLabel>
                    Exames médicos
                </TextLabel>

                <Button
                    activeOpacity={.8}
                    onPress={() => navigation.navigate("MedicalExamsPhotos")}
                    width={'100%'}
                    height={140}
                    marginTop={20}
                    backgroundColor={APP_COLORS.lightGray}
                    border={APP_COLORS.lightGray}
                    title={<MaterialCommunityIcons name="alert-box-outline" size={24} color="black" />}
                    color={APP_COLORS.white}
                >

                </Button>

                <ContainerView
                    widthContainer={'100%'}
                    marginTop={'6%'}
                >
                    <Button
                        iconRef={<MaterialIcons name="add-a-photo" size={19} color="white" />}
                        activeOpacity={.8}
                        backgroundColor={APP_COLORS.primary}
                        border={APP_COLORS.primary}
                        color={APP_COLORS.white}
                        title={"Enviar"}
                        width={'60%'}
                        isButtonTakePicture={true}
                        spaceIconText={'space-evenly'}
                    />

                    <UnderlinedLink
                        marginTopText={0}
                        textIntput={"Cancelar"}
                        ColorText={APP_COLORS.red}
                        buttonAlign={'center'}
                        buttonOpacity={.8}
                    />
                </ContainerView>
            </ScrollViewContainer>
        </Container>
    )
}