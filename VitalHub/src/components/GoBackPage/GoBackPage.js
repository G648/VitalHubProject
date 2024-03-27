import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';
import { APP_COLORS } from "../../utils/App_colors";

const Container = styled.View`
    position: absolute;
    top: 90px;  
    left: 30px; 
    align-items:center;
    justify-content:space-between;
    flex-direction: row;
    width: 85%;
`

export const CircleComeBack = styled.TouchableOpacity`
    border-radius: 100px;
    width: 35px;
    height: 35px;
    background-color: rgba(73, 179, 186, 0.15);
    padding: 5px 0 5px 5px;
`

export function ComeBack({
    onClick,
    isClosable,
    buttonOpacity
}) {

    const icon = isClosable ? "close" : "arrowleft";
    const iconColor = isClosable ? APP_COLORS.primaryV2 : APP_COLORS.primaryV1;

    return (
        <Container>
            <CircleComeBack
                activeOpacity={buttonOpacity}
                onPress={onClick}
            >
                <AntDesign name={icon} size={24} color={iconColor} />
            </CircleComeBack>

        </Container>
    )
}