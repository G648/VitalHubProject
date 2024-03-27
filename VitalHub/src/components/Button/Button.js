import { View } from "react-native";
import styled from "styled-components/native";
import { ContainerView } from "../Buttons/Buttons";

export const ButtonStyle = styled.TouchableOpacity`
    background-color: ${({ backgroundColor }) => backgroundColor} ;
    border-color: ${({ border }) => border};
    border-width: 2px;
    width:${({ width = '90%' }) => width};
    height: ${({ height = '44px' }) => height};
    border-radius: 5px;
    margin-top: ${({ marginTop }) => `${marginTop}px`};
    padding: 12px 8px 12px 8px;
    align-items: center;
    /* flex-direction: row; */
`

export const TitleStyle = styled.Text`
    font-family: "MontserratAlternates_700Bold";
    height: 20px;
    color: ${({ color }) => color};
    margin-top: -4px;
    font-size: ${({ fontSizeTextButtom = "16px" }) => fontSizeTextButtom};
`

export const ButtonFlex = styled.View`
    flex-direction: row;
    gap: 10px;
`

export function Button({
    title,
    backgroundColor,
    color,
    border,
    marginTop,
    onPress,
    activeOpacity,
    width,
    height,
    iconRef,
    isButtonTakePicture,
    spaceIconText
}) {
    return (
        <ButtonStyle
            backgroundColor={backgroundColor}
            border={border}
            marginTop={marginTop}
            onPress={onPress}
            activeOpacity={activeOpacity}
            width={width}
            height={height}
        >
            {iconRef &&
                <ContainerView 
                justifyContent={spaceIconText}
                >
                    <View>
                        {iconRef}
                    </View>
                </ContainerView>
            }
            
            <TitleStyle color={color}>
                {title}
            </TitleStyle>
        </ButtonStyle>
    );
}