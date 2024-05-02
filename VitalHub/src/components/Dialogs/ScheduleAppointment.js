import React, { useEffect, useState } from "react";
import {
  CenterContainer,
  ContainerTextBox,
  ModalContainer,
  TextModal,
} from "./CalcelDialogs";
import { InputStyle, TextLabel } from "../../screens/Doctor/MedicalRecord";
import styled from "styled-components";
import { SelectList } from "react-native-dropdown-select-list";
import { APP_COLORS } from "../../utils/App_colors";
import { ContainerView } from "../Buttons/Buttons";
import { Button } from "../Button/Button";
import { UnderlinedLink } from "../Links/Style";
import { FontAwesome } from "@expo/vector-icons";
import { applyMiddleware } from "redux";
import api from "../../service/service";

export const ViewSelectedList = styled.View`
  width: 100%;
  margin-bottom: 25px;
  margin-top: ${({ marginTopList = 0 }) => marginTopList};
`;

export const InputSelectLocation = styled.TextInput.attrs({
  placeholderTextColor: APP_COLORS.primaryV1,
})`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-width: 2;
  border-color: ${({ borderColor }) => borderColor};
  border-radius: 5px;
  padding: 0px 20px;
  color: ${APP_COLORS.primaryV1};
  font-size: 15px;
  font-weight: 500;
`;

export const SelectedList = styled(SelectList)`
  color: ${APP_COLORS.secondary};
`;

export default function ScheduleAppointment({
  isVisible,
  closeModal,
  titleContent,
  alignItemsContainer,
  paddingTitle,
  fontSizeText,
  heightModal,
  widthModal,
  justifyContentModal,
  mockdata,
  placeholder,
  setSelectedType,
  save,
  onSelected,
  cancelDialog,
  onClick,
  onChangeText,
  setDefault
}) {
  return (
    <ModalContainer
      visible={isVisible}
      onRequestClose={closeModal}
      animationType="slide"
      transparent={true}
    >
      <CenterContainer
        padding={paddingTitle}
        alignItemsContainer={alignItemsContainer}
        justifyContent={justifyContentModal}
      >
        <ContainerTextBox heightModal={heightModal} widthModal={widthModal}>
          <TextModal fontSizeText={fontSizeText}>{titleContent}</TextModal>

          <TextLabel marginBottom={15}>Informe o tipo de consulta</TextLabel>
          <ViewSelectedList>
            <SelectedList
              data={mockdata}
              placeholder={placeholder}
              setSelected={setSelectedType}
              save={save}
              onSelect={onSelected}
              boxStyles={{
                borderColor: APP_COLORS.primary,
                borderWidth: 2,
                height: 60,
                alignItems: "center",
              }}
              dropdownStyles={{
                backgroundColor: "white",
                position: "absolute",
                top: 40,
                width: "100%",
                height: "80px",
                zIndex: 1,
                borderColor: APP_COLORS.primary,
                borderWidth: "2px",
                borderRadius: 5,
                borderWidth: 2,
                borderTopWidth: 0,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
              }}
              fontFamily="MontserratAlternates_600SemiBold"
              dropdownTextStyles={{
                color: APP_COLORS.primaryV1,
              }}
              inputStyles={{
                color: APP_COLORS.primaryV1,
              }}
              arrowicon={
                <FontAwesome
                  name="caret-down"
                  size={24}
                  color={APP_COLORS.primaryV1}
                />
              }
            />
          </ViewSelectedList>
          <TextLabel marginBottom={15}>Qual o nivel da consulta</TextLabel>
          <ContainerView widthContainer={"100%"}>
            <Button
              width={"32%"}
              activeOpacity={0.8}
              title={"Rotina"}
              border={APP_COLORS.primaryV2}
              color={APP_COLORS.primaryV1}
              // backgroundColor={selectedButton === "Agendadas" ? APP_COLORS.secondary : "transparent"}
            />

            <Button
              width={"32%"}
              activeOpacity={0.8}
              title={"Exame"}
              border={APP_COLORS.primaryV2}
              color={APP_COLORS.primaryV1}
              // backgroundColor={selectedButton === "Realizadas" ? APP_COLORS.secondary : "transparent"}
            />

            <Button
              width={"32%"}
              activeOpacity={0.8}
              title={"Urgência"}
              border={APP_COLORS.primaryV2}
              color={APP_COLORS.primaryV1}
              // backgroundColor={selectedButton === "Canceladas" ? APP_COLORS.secondary : "transparent"}
            />
          </ContainerView>
          <TextLabel marginBottom={15}>
            Informe a localização desejada
          </TextLabel>

          <InputSelectLocation
            width={"100%"}
            borderColor={APP_COLORS.primary}
            height={60}
            placeholder={"informe a localização"}
            onChangeText={onChangeText}
          />

          <Button
            backgroundColor={APP_COLORS.secondary}
            border={APP_COLORS.secondary}
            activeOpacity={0.8}
            marginTop={60}
            width={"100%"}
            title={"Continuar"}
            color={APP_COLORS.white}
            onPress={onClick}
          />

          <UnderlinedLink
            textIntput={"Cancelar"}
            ColorText={APP_COLORS.secondary}
            onClick={cancelDialog}
            buttonAlign={"center"}
            buttonOpacity={0.8}
            setDefault={setDefault}
          />
        </ContainerTextBox>
      </CenterContainer>
    </ModalContainer>
  );
}
