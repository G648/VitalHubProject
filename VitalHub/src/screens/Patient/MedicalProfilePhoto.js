import React, { useEffect, useRef, useState } from "react";
import { CameraView } from "expo-camera";
import { Container } from "../../components/Header/Header";
import styled from "styled-components/native";
import { UnderlinedLink } from "../../components/Links/Style";
import { APP_COLORS } from "../../utils/App_colors";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Alert, Image, Modal, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDecodeToken } from "../../utils/Auth";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

export const OlderPictures = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

export const Options = styled.TouchableOpacity``;

export const BtnView = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const CameraViewContainer = styled(CameraView)`
  flex: 1;
  width: 100%;
  height: 80%;
`;

export const ViewFlip = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

export const BtnCamera = styled.TouchableOpacity`
  width: 65%;
  height: 65px;

  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  background-color: ${APP_COLORS.white};

  align-items: center;
  justify-content: center;
`;

export const BtnCancel = styled.TouchableOpacity`
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  background-color: ${APP_COLORS.white};

  align-items: center;
  justify-content: center;
`;
export const BtnSave = styled.TouchableOpacity`
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  background-color: ${APP_COLORS.white};

  align-items: center;
  justify-content: center;
`;

export const BoxButons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  position: relative;
  bottom: 20%;
  left: 2.5%;
`;

export default function MedicalExamsPhotos(
  { navigation },
  route,
  getMediaLibrary = false
) {
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [captureMode, setCaptureMode] = useState("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [typeCamera, setTypeCamera] = useState("back");

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const [lastestPhoto, setLastestPhoto] = useState(null);

  console.log(typeCamera);

  async function CapturePhoto() {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
      setPhoto(photo.uri);

      setOpenModal(true);
    }
  }

  async function TakeVideo() {
    if (cameraRef) {
      setIsRecording(true);
      const photo = await cameraRef.current.recordAsync();

      setPhoto(photo.uri);

      setOpenModal(true);
    }
  }

  async function SavePhoto() {
    if (photo) {
      await MediaLibrary.createAssetAsync(photo)
        .then(() => {
          console.log("Sucesso", "Foto salva na galeria");
        })
        .catch(() => {
          console.log("erro ao processar foto");
        });
    }
  }

  async function GetLastPhoto() {
    const { assets } = await MediaLibrary.getAssetsAsync({
      sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      first: 1,
    });

    if (assets.length > 0) {
      const infoAssets = await MediaLibrary.getAssetInfoAsync(assets[0].id);
      setLastestPhoto(infoAssets.localUri);
    }
  }

  async function SelectImageGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setOpenModal(true);
    }
  }

  async function SendPhotoToProfile() {
    const retornoStorage = await AsyncStorage.getItem("token");
    console.log(retornoStorage);
    const token = await userDecodeToken();
    console.log("Role do usuário:", token.role);

    let navigationTarget = token.role === "Medico" ? 'DoctorHome' : 'HomePatient';

    navigation.navigate(navigationTarget, {
      photoUri: photo,
      screen: token.role === "Medico" ? 'DoctorProfile' : 'PatientProfile',
      onGoBack: () => setOpenModal(false) // Feche o modal após a navegação bem-sucedida
    });
  }


  useEffect(() => {
    (async () => {
      if (permissionResponse && !permissionResponse.granted) {
        await requestPermission();
      }
    })();
  }, []);

  useEffect(() => {
    const fetchLastPhoto = async () => {
      await GetLastPhoto();
    };

    fetchLastPhoto();
  }, []);

  useEffect(() => {
    if (getMediaLibrary) {
      GetLastPhoto();
    }
  }, [photo]);


  return (
    <Container>
      <CameraViewContainer
        getMediaLibrary={true}
        ref={cameraRef}
        facing={typeCamera}
        ratio={"16:9"}
      >
        <ViewFlip>
          <UnderlinedLink
            textIntput={"Trocar"}
            ColorText={APP_COLORS.white}
            onClick={() => {
              if (typeCamera === "back") {
                setTypeCamera("front");
              } else {
                setTypeCamera("back");
              }
            }}
          />
        </ViewFlip>
        <BtnView>
          <Options onPress={() => SelectImageGallery()}>
            {lastestPhoto != null ? (
              <OlderPictures source={{ uri: lastestPhoto }} />
            ) : null}
          </Options>
          <BtnCamera
            onPress={() => {
              if (captureMode === "photo") {
                CapturePhoto();
              } else {
                isRecording ? cameraRef.current.stopRecording() : TakeVideo();
              }
            }}
            activeOpacity={0.8}
          >
            {captureMode === "photo" ? (
              <FontAwesome name="camera" size={24} color="black" />
            ) : isRecording ? (
              <FontAwesome name="stop" size={24} color="black" />
            ) : (
              <FontAwesome name="video-camera" size={24} color="black" />
            )}
          </BtnCamera>
        </BtnView>

        <Modal animationType="slide" transparent={false} visible={openModal}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 30,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 40, left: 30 }}
              onPress={() => setOpenModal(false)}
            >
              <FontAwesome name="close" size={30} color="black" />
            </TouchableOpacity>

            <Image
              style={{ width: "100%", height: 500, borderRadius: 10 }}
              source={{ uri: photo }}
            />
          </View>

          <BoxButons>
            <BtnCancel
              // style={styles.btnCancel}
              onPress={() => setOpenModal(false)}
            >
              <FontAwesome name="trash" size={30} color="red" />
            </BtnCancel>
            <BtnSave
              onPress={() => {
                SendPhotoToProfile();
                SavePhoto();
              }}
            >
              <AntDesign name="upload" size={24} color="black" />
            </BtnSave>
          </BoxButons>
        </Modal>
      </CameraViewContainer>
    </Container>
  );
}
