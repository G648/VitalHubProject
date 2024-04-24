import styled from "styled-components/native";
import { CenterContainer, ContainerTextBox, ModalContainer, TextModal } from "./CalcelDialogs";
import { ProfileImage, ProfileName } from "../FlatlistUsers/CardFlatlistUsers";
import { Button } from "../Button/Button";
import { APP_COLORS } from "../../utils/App_colors";
import { UnderlinedLink } from "../Links/Style";
import { MatieralCommunityIcons } from "@expo/vector-icons"


export const ContentInputSmall = styled.View`
    width: 144px;
    flex-direction: column;
    align-self: center;
    justify-content: center;
    align-items: center;
    /* margin-bottom: 30px; */
    margin-left: 248px;
    z-index: 2000;
`

export const ButtonCamera = styled.TouchableHighlight.attrs({
    activeOPacity: 0.8
})`
    padding: 12px;
    border-radius: 10px;
    background-color: #496bba;
    border: 1px solid #fbfbfb;

    bottom: -20px;
    right: 15px;
    position: absolute;
    z-index: 3000;
`

export const ContainerInfoUser = styled.View`
    flex-direction: row;
    width: ${({ widtContainerInfoUser }) => widtContainerInfoUser};
    justify-content: space-between;
    margin-bottom: 40px;
`

export const Infouser = styled.Text`
    font-size: ${({ fontSizeAge = "16px" }) => fontSizeAge};
`

export const ProfileImageModal = styled.Image`
    width: ${({ widthImageUser = "60px" }) => widthImageUser};
    height: ${({ heightImageUser = "60px" }) => heightImageUser};
    border-radius: 8px;
    margin-bottom: 25px;
    position: relative;
`

export function SeeMedicalDialog({
    isVisible,
    closeModal,
    imageUser,
    widthImageUser,
    heightImageUser,
    nameUser,
    ageUser,
    emailuser,
    onPress,
    onPressCancel,
    showCancelButton,
    widtContainerInfoUser,
    marginBottomName,
    titleButton
}) {
    return (
        <ModalContainer
            visible={isVisible}
            onRequestClose={closeModal}
            animationType='slide'
            transparent={true}
        >
            <CenterContainer>
                <ContainerTextBox>
                    <ProfileImageModal
                        source={imageUser}
                        widthImageUser={widthImageUser}
                        heightImageUser={heightImageUser}
                    />

                    <ProfileName
                        marginBottomName={marginBottomName}
                    >
                        {nameUser}

                    </ProfileName>

                    <ContainerInfoUser
                        widtContainerInfoUser={widtContainerInfoUser}
                    >
                        <Infouser>
                            {ageUser}
                        </Infouser>
                        <Infouser>
                            {emailuser}
                        </Infouser>
                    </ContainerInfoUser>
                    <Button
                        activeOpacity={.8}
                        backgroundColor={APP_COLORS.secondary}
                        border={APP_COLORS.secondary}
                        color={APP_COLORS.white}
                        onPress={onPress}
                        width={320}
                        title={titleButton}
                    />

                    {showCancelButton && (
                        <UnderlinedLink
                            textIntput={"Cancelar"}
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