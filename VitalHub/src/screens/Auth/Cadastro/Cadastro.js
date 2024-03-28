import React from "react"
import { Container } from "../../../components/Container/Style";
import { Logo } from "../../../components/Logo/Style";
import { Title } from "../../../components/Title/Style";
import { ParagrafText } from "../../../components/Paragraf/Paragraf";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { APP_COLORS } from "../../../utils/App_colors";
import { ComeBack } from "../../../components/GoBackPage/GoBackPage";

const Cadastro = ({ navigation }) => {
    return (
        <Container>
            <ComeBack
                onClick={() => navigation.navigate('Login')}
                buttonOpacity={0.8}
            />

            <Logo
                source={require('../../../assets/Images/LogoBlue.png')}
            />

            <Title>
                Recuperar Senha
            </Title>

            <ParagrafText
                FontColorParagrafo={'#5F5C6B'}
                FontSizeParagrafo={16}
                textValue={"Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha"}
            />

            <Input
                placeholder="Usuário ou Email"
            />

            <Button
                backgroundColor={APP_COLORS.secondary}
                border={APP_COLORS.secondary}
                marginTop={60}
                color={APP_COLORS.white}
                title={"Continuar".toUpperCase()}
                onPress={() => { navigation.navigate('VerificaEmail') }}
                activeOpacity={.8}
            />

        </Container>
    )
}

export default Cadastro;