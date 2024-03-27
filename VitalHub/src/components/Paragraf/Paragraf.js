import styled from "styled-components/native";

export const Paragrafo = styled.Text`
    font-size: ${props => `${props.fontSize}px`};
    font-family: 'MontserratAlternates_700Bold';
    color: ${props => props.fontColor} ;
    text-align: center;
    margin-bottom: 30px;
`


export function ParagrafText( {
    FontSizeParagrafo,
    FontColorParagrafo,
    textValue
}) {
    return(
        <Paragrafo
            fontColor={FontColorParagrafo}
            fontSize= {FontSizeParagrafo}
        >
         {textValue}
        </Paragrafo>
    )
}