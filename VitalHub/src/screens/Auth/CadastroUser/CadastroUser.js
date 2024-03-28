import React from 'react'
import { Container } from '../../../components/Container/Style'
import { Title } from '../../../components/Title/Style'
import { ComeBack } from '../../../components/GoBackPage/GoBackPage'
import { Logo } from '../../../components/Logo/Style'
import { ParagrafText } from '../../../components/Paragraf/Paragraf'
import { APP_COLORS } from '../../../utils/App_colors'
import { InputValues } from '../../../components/Input/Input'
import { Button } from '../../../components/Button/Button'
import { UnderlinedLink } from '../../../components/Links/Style'

export default function CadastroUser({ navigation }) {
    return (
        <Container>

            <ComeBack
                buttonOpacity={.8}
                isClosable={false}
                onClick={() => navigation.navigate('Login')}
            />

            <Logo
                source={require("../../../assets/Images/LogoBlue.png")}
            />

            <Title>
                Criar Conta
            </Title>

            <ParagrafText
                textValue={"Insira seu endereço de e-mail e senha para realizar seu cadastro."}
                FontColorParagrafo={APP_COLORS.grayV2}
                FontSizeParagrafo={16}
            />

            <InputValues
                placeholder={"E-mail"}
                secureTextEntry={false}
            />
            <InputValues
                placeholder={"Senha"}
                secureTextEntry={true}
            />
            <InputValues
                placeholder={"Confirmar Senha"}
                secureTextEntry={true}
            />

            <Button
                title={"cadastrar".toUpperCase()}
                backgroundColor={APP_COLORS.secondary}
                border={APP_COLORS.secondary}
                color={APP_COLORS.white}
                marginTop={30}
                activeOpacity={.8}
                onPress={() => navigation.navigate("Login")}
            />

            <UnderlinedLink
                textIntput={"Cancelar"}
                buttonAlign={"center"}
                buttonOpacity={.6}
                ColorText={APP_COLORS.secondaryV1}
                onClick={() => navigation.navigate('Login')}
            />
        </Container>
    )
}