import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';
import { CardSituation } from "../../utils/AppSituationCard";
import { APP_COLORS } from "../../utils/App_colors";
import { useState } from "react";
import { SeeMedicalDialog } from "../Dialogs/SeeMedicalDialog";

const defaultBgColor = APP_COLORS.grayV6;
const defaultIconColor = APP_COLORS.grayV1;
const defaultTextColor = APP_COLORS.grayV2;

const scheduledBgColor = APP_COLORS.primaryV4;
const scheduledIconColor = APP_COLORS.primary;
const scheduledTextColor = APP_COLORS.primary


export const CardsUser = styled.View`
    flex: 1;
    width: 100%;
    border-radius: 8px;
    flex-direction: row;
    align-self:center;
    padding: 2%;
    margin-bottom: ${({ marginBottom = '5%' }) => marginBottom};
    background-color: #FFF;
    elevation: 5;
`

export const ProfileImage = styled.Image`
    width: ${({ width = '88px' }) => width} ;
    height: ${({ height = '99px' }) => height} ;
    border-radius: 5px ;
    margin-right: 15px;
    margin-top: ${({ marginTop = '0px' }) => marginTop};
`

export const ProfileName = styled.Text`   
    color: #33303e;
    font-family: "MontserratAlternates_600SemiBold";
    font-size: 20px ;
    margin-bottom: ${({ marginBottomName = "0px" }) => marginBottomName};
`

export const ProfileData = styled.View`
    flex-direction: row ;
    gap: 15px ;
    margin-bottom: -10px;
    margin-left: ${({ marginLeftInfoUser = '0px' }) => marginLeftInfoUser};
`
export const TextAge = styled.Text`
    font-size: 16px ;
    color: ${defaultTextColor};
    font-family: "Quicksand_400Regular";
`
export const TextBold = styled(TextAge)`
    font-family: "Quicksand_600SemiBold";
`
export const ViewRow = styled.View`
    width: 100%;
    flex-direction: row ;
    align-items: center ;
    justify-content: space-between ;
    margin-top: 11px ;
`

export const ClockCard = styled.View`
    flex-direction: row;
    align-items:center;
    justify-content:space-between;
    padding: 4px 23px;
    gap: 6px ;
    border-radius: 5px ;
    background-color: ${(props) => props.situation == "Pendentes" ? scheduledBgColor : defaultBgColor} ;
`

export const ClockIcon = styled(AntDesign)`
    color: ${(props) =>
        props.situation === "Pendentes" ? scheduledIconColor : defaultIconColor
    };
`;

export const ClockTime = styled.Text`
    color: ${(props) =>
        props.situation === "Pendentes" ? scheduledTextColor : defaultTextColor
    };
    font-family: "Quicksand_600SemiBold";
    font-size: 16px;
`;

export const ButtonCard = styled.TouchableOpacity`
    
`

export const ButtonText = styled.Text`
    font-family: 'MontserratAlternates_500Medium';
    color: ${(props) =>
        props.situation === "Pendentes" ? APP_COLORS.red : APP_COLORS.secondaryV1
    };
    margin-right: 10px;
`

export const ContainerFlex = styled.View`
    flex: 1;
    flex-direction: column;
    gap: 8px;
`

export const ClinicAvaliation = styled.Text`
    color: #F9A620;
    font-size: 16px;
    margin-left: -15px;
`

export const ButtonSelectedCard = styled.TouchableOpacity`
    border-width: 3px ;
    border-color: ${({ isSelected = false }) => isSelected ? APP_COLORS.secondary : "transparent"};
    width: 100%;
    border-radius: 8px;
    margin-bottom: 5%;
`

export function CardUser({
    imageUser,
    nameUser,
    ageUser,
    descriptionUser,
    schedulingTime,
    iconName,
    iconColor,
    iconSize,
    bgColor,
    situation,
    onPress,
    marginBottomName,
    widthImage,
    heightImage,
    marginLeftInfoUser,
    clinicAvaliation,
    isClinic,
    marginTopImage,
    onPressBorder,
    isSelected,
    marginBottomCard,
    isDoctor
}) {

    return (

        <ButtonSelectedCard
            activeOpacity={2}
            onPress={onPressBorder}
            isSelected={isSelected}
        >

            <CardsUser
                marginBottom={marginBottomCard}
            >
                <ProfileImage
                    width={widthImage}
                    height={heightImage}
                    source={{uri: imageUser}}
                    marginTop={marginTopImage}
                />

                <ContainerFlex>

                    <ProfileName
                        marginBottomName={marginBottomName}
                    >
                        {nameUser}
                    </ProfileName>

                     <ProfileData
                        marginLeftInfoUser={marginLeftInfoUser}
                    >
                        <TextAge>{ageUser}</TextAge>
                        <TextBold>{descriptionUser}</TextBold>
                    </ProfileData>

                    <ViewRow>
                        {!isDoctor &&
                            <ClockCard
                                situation={bgColor}
                            >
                                <ClockIcon
                                    name={iconName}
                                    size={iconSize}
                                    color={iconColor}
                                    situation={bgColor}
                                />
                                <ClockTime situation={bgColor}>
                                    {schedulingTime}
                                </ClockTime>

                            </ClockCard>
                        }


                        {isClinic ? <AntDesign name="star" size={18} color="#F9A620" /> : null}
                        <ClinicAvaliation>
                            {clinicAvaliation}
                        </ClinicAvaliation>
                        <ButtonCard
                            activeOpacity={.6}
                            onPress={onPress}
                        >
                            {situation === "Pendentes" ? (
                                <ButtonText
                                    situation={situation}
                                >
                                    {"Cancelar"}
                                </ButtonText>
                            ) : situation === "Realizados" ? (
                                <ButtonText>
                                    {"Ver Prontuário"}
                                </ButtonText>
                            ) : (
                                <>

                                </>
                            )}
                        </ButtonCard>
                    </ViewRow>
                </ContainerFlex>

                <ButtonCard />
            </CardsUser>
        </ButtonSelectedCard>
    )
}
