import React from 'react'
import { Modal, View } from 'react-native'
import { styled } from 'styled-components/native'
import { Title } from '../Title/Style'
import { APP_COLORS } from '../../utils/App_colors'
import { Button } from '../Button/Button'
import { UnderlinedLink } from '../Links/Style'


export const ModalContainer = styled(Modal)`
`

export const CenterContainer = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
    align-items:center;
    justify-content:center;
    justify-content: ${({ justifyContent = "center" }) => justifyContent};
`

export const ContainerTextBox = styled.View`
    background-color: ${APP_COLORS.white};
    border-radius: 8px;
    padding: ${({ padding = "25px" }) => padding};
    align-items: ${({ alignItemsContainer = "center" }) => alignItemsContainer};
    height: ${({ heightModal }) => heightModal};
    width: ${({ widthModal }) => widthModal};
    
`

export const TextModal = styled(Title)`
    text-align: center;
    font-size: ${({ fontSizeText = "18px" }) => fontSizeText};
    padding-bottom: ${({marginBottom = '15px'}) => marginBottom};
`

export const TextParagrafModal = styled(TextModal)`
    margin-top: 18;
    margin-bottom: -5;
`

export const ContainerScheduleInfos = styled.View`
    align-items: flex-start;
    width: 310;
`

export default function CancelDialogs({
    titleContent,
    isVisible,
    closeModal,
    fontSizeText,
    fontSizeTextParagraf,
    onPressConfirm,
    onPressCancel,
    customContent,
    confirmButtonTitle,
    showCancelButton,
    cancelButtonTitle,
    alignItemsContainer,
    paddingTitle,
    isModalScheduling,
    dataConsulta,
    nomeMedico,
    especialidadeMedico,
    localConsulta,
    tipoConsulta,
    horaConsulta
}) {
    return (
        <ModalContainer
            visible={isVisible}
            onRequestClose={closeModal}
            animationType='slide'
            transparent={true}
        >
            <CenterContainer>
                <ContainerTextBox
                    padding={paddingTitle}
                    alignItemsContainer={alignItemsContainer}
                >

                    <TextModal
                        fontSizeText={fontSizeText}
                    >
                        {titleContent}
                    </TextModal>

                    <TextParagrafModal
                        fontSizeText={fontSizeTextParagraf}
                    >
                        {customContent}
                    </TextParagrafModal>

                    {isModalScheduling &&
                        <ContainerScheduleInfos>
                            <TextParagrafModal>
                                Data da consulta
                            </TextParagrafModal>
                            <TextModal fontSizeText={14}>
                                {dataConsulta }  às  { horaConsulta} horas
                            </TextModal>
                            <TextParagrafModal>
                                Médico(a) da consulda
                            </TextParagrafModal>
                            <TextModal fontSizeText={14}>
                                {nomeMedico}
                            </TextModal>
                            <TextModal fontSizeText={14} marginBottom={'-10px'}>
                                {especialidadeMedico}
                            </TextModal>
                            <TextParagrafModal>
                                Local da consulta
                            </TextParagrafModal>
                            <TextModal fontSizeText={14}>
                                {localConsulta}
                            </TextModal>
                            <TextParagrafModal>
                                Tipo da consulta
                            </TextParagrafModal>
                            <TextModal fontSizeText={14}>
                                {tipoConsulta}
                            </TextModal>
                        </ContainerScheduleInfos>
                    }

                    <Button
                        activeOpacity={.8}
                        backgroundColor={APP_COLORS.secondary}
                        border={APP_COLORS.secondary}
                        color={APP_COLORS.white}
                        title={confirmButtonTitle || "Confirmar"}
                        width={320}
                        onPress={onPressConfirm}
                    >

                    </Button>

                    {showCancelButton && (
                        <UnderlinedLink
                            textIntput={cancelButtonTitle || "Cancelar"}
                            ColorText={APP_COLORS.secondaryV1}
                            buttonOpacity={.8}
                            buttonAlign={"center"}
                            onClick={onPressCancel}
                        />
                    )}

                </ContainerTextBox>
            </CenterContainer>
        </ModalContainer>

    )
} 