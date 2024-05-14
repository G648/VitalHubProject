import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  requestForegroundPermissionsAsync, //solicita o acesso à localização
  getCurrentPositionAsync, //recebe a localização atual
  watchPositionAsync, //monitorar o posicionamento
  LocationAccuracy,
} from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { mapskey } from "../../utils/MapsApiKey";
import { Container } from "../../components/Container/Style";
import { Foundation } from "@expo/vector-icons";
import styled from "styled-components/native";
import { APP_COLORS } from "../../utils/App_colors";
import { darkMaps } from "../../utils/MapsTheme";
import { Title } from "../../components/Title/Style";
import { InputStyle, TextLabel } from "../Doctor/MedicalRecord";
import { UnderlinedLink } from "../../components/Links/Style";

export const ZoomOut = styled.TouchableOpacity`
  position: absolute;
  bottom: 51.5%;
  right: 10%;
  background-color: ${APP_COLORS.white};
  padding: 16px;
  border-radius: 8px;
`;
export const Button = styled.TouchableOpacity`
  background-color: ${APP_COLORS.white};
  width: 150px;
  height: 50px;
  position: absolute;
  bottom: 52%;
  right: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: black;
`;

export const ButtonText = styled.Text`
  color: ${APP_COLORS.white};
  position: absolute;
  bottom: 15px;
`;

export const MapViewContainer = styled(MapView)`
  flex: 1;
  width: 100%;
  background-color: ${APP_COLORS.grayV6};
`;

export const ContainerMap = styled.View`
  height: 60%;
  width: 100%;
  bottom: 10%;
  position: relative;
`;

export const ContainerInfoClinic = styled.View`
  width: 100%;
  height: 50%;
  border-radius: 10px 10px 0 0;
  background-color: white;
  position: absolute;
  bottom: 0;
  elevation: 8;
  align-items: center;
`;

export const ContainerInfos = styled.View`
  width: 90%;
  align-items: center;
  justify-content: center;
`;

export const BoxInfoRow = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const ContainerColumn = styled.View``;

export const CenterInfoMap = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20%;
`;

export default function MapViewLocation({ navigation, route }) {
  useEffect(() => {
    console.log(MapData);
  }, []);

  const mapReference = useRef(null);
  const [initialPosition, setInitialPosition] = useState(null);
  const [theme, setTheme] = useState(false);
  const { MapData } = route.params;

  async function getLocation() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const captureLocation = await getCurrentPositionAsync();
      setInitialPosition(captureLocation);
    }
  }

  useEffect(() => {
    getLocation();

    watchPositionAsync(
      {
        accuracy: LocationAccuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      async (response) => {
        await setInitialPosition(response);
        // mapReference.current?.animateCamera({
        //   pitch: 60,
        //   center: response.coords
        // })
        // console.log(response);
      }
    );
  }, [1000]);

  useEffect(() => {
    realoadMapView();
  }, [initialPosition]);

  async function realoadMapView() {
    if (mapReference.current && initialPosition) {
      await mapReference.current.fitToCoordinates(
        [
          {
            latitude: initialPosition.coords.latitude,
            longitude: initialPosition.coords.longitude,
          },
          { latitude: MapData.longitude, longitude: MapData.latitude },
        ],
        {
          edgePadding: { top: 150, right: 60, bottom: 80, left: 60 },
          animated: true,
        }
      );
    }
  }

  function toggleTheme() {
    setTheme(!theme);
  }
  return (
    <Container>
      {initialPosition != null ? (
        <ContainerMap>
          <MapViewContainer
            ref={mapReference}
            initialRegion={{
              latitude: initialPosition.coords.latitude,
              longitude: initialPosition.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            provider={PROVIDER_GOOGLE}
            customMapStyle={theme ? darkMaps : []}
          >
            <Marker
              coordinate={{
                latitude: initialPosition.coords.latitude,
                longitude: initialPosition.coords.longitude,
              }}
              title="Initial Position"
              pinColor={"red"}
            />

            <MapViewDirections
              origin={initialPosition.coords}
              destination={{
                latitude: MapData.longitude,
                longitude: MapData.latitude,
              }}
              strokeWidth={5}
              strokeColor="#496BBA"
              apikey={mapskey}
            />

            <Marker
              coordinate={{
                latitude: MapData.longitude,
                longitude: MapData.latitude,
              }}
              title="Você está aqui"
              pinColor={"blue"}
            />
          </MapViewContainer>
        </ContainerMap>
      ) : (
        <CenterInfoMap>
          <Text>Carregando</Text>
          <ActivityIndicator />
        </CenterInfoMap>
      )}

      <Button activeOpacity={0.8} onPress={toggleTheme}>
        <ButtonText>{theme ? "Tema Claro" : "Tema Escuro"}</ButtonText>
      </Button>

      <ZoomOut activeOpacity={0.8} onPress={() => realoadMapView()}>
        <Foundation
          name="zoom-out"
          size={28}
          color={theme ? "black" : "black"}
        />
      </ZoomOut>

      <ContainerInfoClinic>
        <ContainerInfos>
          <Title marginTop={30}>Clínica Natureh</Title>

          <TextLabel>Endereço</TextLabel>
          <InputStyle
            placeholder={MapData.logradouro}
            boxHeigth={"60px"}
            boxWidth={"100%"}
            placeholderTextColor={APP_COLORS.secondary}
            editable={false}
          />
          <BoxInfoRow>
            <ContainerColumn>
              <TextLabel>Número</TextLabel>
              <InputStyle
                placeholder="Rua Vicenso Silva, 987"
                boxHeigth={"60px"}
                boxWidth={"90%"}
                placeholderTextColor={APP_COLORS.secondary}
                editable={false}
              />
            </ContainerColumn>

            <ContainerColumn>
              <TextLabel>Cidade</TextLabel>
              <InputStyle
                placeholder={MapData.cidade}
                boxHeigth={"60px"}
                boxWidth={"160%"}
                placeholderTextColor={APP_COLORS.secondary}
                editable={false}
              />
            </ContainerColumn>
          </BoxInfoRow>
        </ContainerInfos>

        <UnderlinedLink
          textIntput={"Voltar"}
          ColorText={APP_COLORS.secondary}
          buttonAlign={"center"}
          onClick={() => navigation.navigate("HomePatient")}
          buttonOpacity={0.8}
        />
      </ContainerInfoClinic>
    </Container>
  );
}
