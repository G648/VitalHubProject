import React, { useEffect, useRef, useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import { Container } from '../../components/Header/Header'
import styled from 'styled-components/native'
import { UnderlinedLink } from '../../components/Links/Style'
import { APP_COLORS } from '../../utils/App_colors'
import { FontAwesome } from '@expo/vector-icons'
import { Alert, Image, Modal, TouchableOpacity, View } from 'react-native'
import * as MediaLibrary from 'expo-media-library'

export const CameraView = styled(Camera)`
    flex: 1;
    width: 100%;
    height: 80%;
`

export const ViewFlip = styled.View`
    flex: 1;
    background-color: transparent;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`

export const BtnCamera = styled.TouchableOpacity`
    margin: 20px;
    padding: 20px;
    border-radius: 15px;
    background-color: ${APP_COLORS.white};

    align-items: center;
    justify-content: center;
`

export const BtnCancel = styled.TouchableOpacity`
    margin: 20px;
    padding: 20px;
    border-radius: 15px;
    background-color: ${APP_COLORS.white};

    align-items: center;
    justify-content: center;
`
export const BtnSave = styled.TouchableOpacity`
    margin: 20px;
    padding: 20px;
    border-radius: 15px;
    background-color: ${APP_COLORS.white};

    align-items: center;
    justify-content: center;
`

export const BoxButons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    position: relative;
    bottom: 20%;
    left: 2.5%;
    `

export default function MedicalExamsPhotos() {

    const cameraRef = useRef(null)
    const [photo, setPhoto] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [captureMode, setCaptureMode] = useState('photo')
    const [isRecording, setIsRecording] = useState(false)
    const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back)

    async function CapturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhoto(photo.uri)

            setOpenModal(true)
            console.log(photo);
        }
    }

    async function TakeVideo() {
        if (cameraRef) {
            setIsRecording(true)
            const photo = await cameraRef.current.recordAsync()

            setPhoto(photo.uri)

            setOpenModal(true)
            console.log(photo);
        }
    }

    async function StopVideo() {
        if (cameraRef) {
            setIsRecording(false)
            const photo = await cameraRef.current.stopRecording()
        }
    }

    async function SavePhoto() {
        if (photo) {
            await MediaLibrary.createAssetAsync(photo)
                .then(() => {
                    Alert.alert("Sucesso", 'Foto salva na galeria')
                }).catch(() => {
                    Alert.alert("erro ao processar foto")
                })
        }
    }

    useEffect(() => {
        (async () => {
            //acesso a camera
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()

            //acesso a galeria da camera
            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()

            //acesso ao microfone
            const { status: videoStatus } = await Camera.requestMicrophonePermissionsAsync()
        })();

    }, [])

    return (
        <Container>
            <CameraView
                ref={cameraRef}
                type={typeCamera}
                ratio={'16:9'}
            >
                <ViewFlip>
                    <UnderlinedLink
                        textIntput={"Trocar"}
                        ColorText={APP_COLORS.white}
                        onClick={() => {

                            if (captureMode === 'photo') {
                                setCaptureMode('video');
                                StopVideo(); // Para qualquer vídeo em andamento
                            } else {
                                setCaptureMode('photo');
                            }
                        }
                        }
                    />
                </ViewFlip>

                <BtnCamera
                    onPress={() => {
                        if (captureMode === 'photo') {
                            CapturePhoto();
                        } else {
                            isRecording ? cameraRef.current.stopRecording() : TakeVideo();

                        }
                    }}
                    activeOpacity={.8}
                >
                    {captureMode === 'photo' ? (
                        <FontAwesome name="camera" size={24} color="black" />
                    ) : (
                        isRecording ? <FontAwesome name="stop" size={24} color="black" /> : <FontAwesome name="video-camera" size={24} color="black" />
                    )

                    }
                </BtnCamera>


                <Modal animationType='slide' transparent={false} visible={openModal}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }}>

                        <TouchableOpacity
                            style={{ position: 'absolute', top: 40, left: 30 }}
                            onPress={() => setOpenModal(false)}
                        >
                            <FontAwesome name="close" size={30} color="black" />
                        </TouchableOpacity>

                        <Image
                            style={{ width: '100%', height: 500, borderRadius: 10 }}
                            source={{ uri: photo }}
                        />
                    </View>

                    <BoxButons >
                        <BtnCancel
                            // style={styles.btnCancel}
                            onPress={() => setOpenModal(false)}
                        >
                            <FontAwesome name="trash" size={30} color="red" />
                        </BtnCancel>
                        <BtnSave
                            // style={styles.btnSave}
                            onPress={() => SavePhoto()}
                        >
                            <FontAwesome name="save" size={30} color="black" />
                        </BtnSave>
                    </BoxButons>
                </Modal>
            </CameraView>
        </Container>
    )
}