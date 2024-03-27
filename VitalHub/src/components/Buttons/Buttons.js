import styled from "styled-components/native";

export const ContainerView = styled.View`
    flex-direction: row;
    justify-content: ${({justifyContent= 'space-between'}) => justifyContent};
    width: ${({widthContainer = "90%"}) => widthContainer};
    height: 70px;
    margin-bottom: ${({marginBottom}) => marginBottom};
    margin-top: ${({marginTop = "0%"}) => marginTop}
`
