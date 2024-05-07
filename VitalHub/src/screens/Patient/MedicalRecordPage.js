import React, { useEffect, useState } from 'react'
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
import api from "../../service/service";

export default function MedicalRecordPage({ navigation, route }) {
    const { uriCameraCapture } = route.params || {};
    const [isEditable, setIsEditable] = useState(false);
    const [ocr, setOcr] = useState('');
    const [descricaoExame, setDescricaoExame] = useState('');
    const [photoUri, setPhotoUri] = useState(null);

    const { consultaId, foto, nomeMedico, crm, especialidade, descricao, diagnostico } = route.params;

    // console.log(consultaId, foto, nomeMedico, crm, especialidade, descricao, diagnostico);


    const toggleEdit = () => {
        setIsEditable(prevState => !prevState); // Alterna entre editável e não editável
    };

    const handleSave = () => {
        setIsEditable(false); // Define todos os inputs como não editáveis ao salvar
    };

    async function GetExame() {
        try {
            const response = await api.get(`/api/Exame/BuscarPorIdConsulta?idConsulta=${consultaId}`)
            setDescricaoExame(response.data[0].descricao)
        } catch (error) {
            console.log(error);
        }
    }

    // async function InserirExame() {
    //     const formData = new FormData();
    //     formData.append("ConsultaId", consultaId)
    //     formData.append("Arquivo", {
    //         uri: photoUri,
    //         name: `image.${photoUri.split('.').pop()}`,
    //         type: `image/${photoUri.split('.').pop()}`
    //     })

    //     await api.post(`/api/Exame/Cadastrar`, formData, {
    //         header: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     }).then(response => {
    //         setOcr(ocr + "\n" + response.data.descricao)
    //         console.log(ocr);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }

    async function InserirExame() {
        const formData = new FormData();
        formData.append('ConsultaId', consultaId);
        formData.append('Imagem', {
            uri: route.params.photoUri,
            name: `image.jpg`,
            type: `image/jpg`,
        });

        console.log({
            uri: route.params.photoUri,
            name: `image.${route.params.photoUri.split('.').pop()}`,
            type: `image/${route.params.photoUri.split('.').pop()}`,
        });

        try {
            const response = await api.post(`/api/Exame/Cadastrar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setDescricaoExame(descricaoExame + '\n' + response.data.descricao);
        } catch (error) {
            console.error('Deu erro:', error);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        console.log(route.params);
        if(route.params)
        {
            setPhotoUri(route.params.foto)
            // console.log(consultaId);
            // console.log("uriPhoto" + '\n' );
            console.log(route.params.foto);
            InserirExame();
        }
    }, [route])

    // useEffect(() => {
    //     if (uriCameraCapture) {
    //         InserirExame()
    //         console.log(route.params);
    //     }
    // }, [uriCameraCapture])

    // useEffect(() => {
    //     if (consultaId) {
    //         GetExame()
    //     }
    // }, [consultaId])

    return (
        <Container>
            <ProfileImageModal
                source={{ uri: 'https://blobvitalhubg16m.blob.core.windows.net/blobvitalhubcontainerg16m/0e5906e4a6764a8799b77757e9ae5ffb.jpg' }}
                // source={{ uri: photoUri }}
                widthImageUser={"100%"}
                heightImageUser={280}
                resizeMode='cover'
            />

            <DoctorContainerInfos>
                <DataUser>
                    <DoctorName>
                        {`${nomeMedico}`}
                    </DoctorName>

                    <ContainerInfoDoctor>
                        <Crm>
                            {crm}
                        </Crm>

                        <Especialidade>
                            {especialidade}
                        </Especialidade>
                    </ContainerInfoDoctor>
                </DataUser>
            </DoctorContainerInfos>
            <ScrollViewContainer>
                <TextLabel>
                    Descrição da consulta
                </TextLabel>
                <InputStyle
                    placeholder={descricao}
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
                    placeholder={diagnostico}
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
                    width={'100%'}
                    height={140}
                    marginTop={20}
                    backgroundColor={APP_COLORS.lightGray}
                    border={APP_COLORS.lightGray}
                    title={<MaterialCommunityIcons name="alert-box-outline" size={14} color="black" />}
                    color={APP_COLORS.white}
                >

                </Button>

                <ContainerView
                    widthContainer={'100%'}
                    marginTop={'6%'}
                >
                    <Button
                        iconRef={<MaterialIcons name="add-a-photo" size={19} color="white" />}
                        onPress={() => {
                            navigation.push("MedicalExamsPhotos",
                                {
                                    consultaId: consultaId,
                                    nomeMedico: nomeMedico,
                                    crm: crm,
                                    especialidade: especialidade,
                                    descricao: descricao,
                                    diagnostico: diagnostico
                                }
                            );
                            InserirExame();
                        }}
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
                <InputStyle
                    placeholder={descricaoExame}
                    placeholderTextColor={APP_COLORS.primaryV1}
                    boxHeigth={'150px'}
                    boxWidth={"100%"}
                    borderColor={APP_COLORS.primary}
                    multiline={true}
                    editable={isEditable}
                    isEditable={isEditable}

                >
                    {descricaoExame}
                </InputStyle>
            </ScrollViewContainer>
        </Container>
    )
}