import React from "react"
import { Container } from "../../../components/Container/Style"
import { ComeBack } from "../../../components/GoBackPage/GoBackPage"
import { Logo } from "../../../components/Logo/Style"
import { Title } from "../../../components/Title/Style"
import { ParagrafText } from "../../../components/Paragraf/Paragraf"
import { APP_COLORS } from "../../../utils/App_colors"
import { ContainerValidator, InputValidator } from "../../../components/InputValidationEmail/InputValidationEmail"
import { Button } from "../../../components/Button/Button"
import { UnderlinedLink } from "../../../components/Links/Style"


export const VerificaEmail = ({ navigation }) => {
    return (
        <Container>
            <ComeBack
                isClosable={true}
                onClick={() => navigation.navigate('Login')}
                buttonOpacity={.8}
            />
            <Logo
                source={require('../../../assets/Images/LogoBlue.png')}
            />
            <Title>
                Verifique seu e-mail
            </Title>
            <ParagrafText
                FontSizeParagrafo={15}
                FontColorParagrafo={APP_COLORS.grayV2}
                textValue={"Digite o código de 4 dígitos enviado para username@email.com"}
            />
            <ContainerValidator>
                <InputValidator />
                <InputValidator />
                <InputValidator />
                <InputValidator />
            </ContainerValidator>

            <Button
                titleButton={"Entrar"}
                backgroudButton={APP_COLORS.secondaryV2}
                fieldButton={APP_COLORS.secondaryV2}
                color={APP_COLORS.white}
                buttonOppacity={.9}
                marginTopButton={50}
            />

            <UnderlinedLink
                textIntput={"Reenviar Código"}
                ColorText={APP_COLORS.secondaryV1}
                buttonOpacity={.8}
            />
        </Container>
    )
}