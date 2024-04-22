import React, { useState } from "react"
import { Container } from "../../../components/Container/Style";
import { Logo } from "../../../components/Logo/Style";
import { Title } from "../../../components/Title/Style";
import { ParagrafText } from "../../../components/Paragraf/Paragraf";
import { Input, InputValues } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { APP_COLORS } from "../../../utils/App_colors";
import { ComeBack } from "../../../components/GoBackPage/GoBackPage";
import api from "../../../service/service";

const Cadastro = ({ navigation }) => {

    const [email, setEmail] = useState("gabriel10demetrio@gmail.com");

    console.log(email);

    async function EnviarEmail() {
        await api.post(`/RecuperarSenha?email=${email}`)
            .then(() => {
                navigation.replace("VerificaEmail", { emailRecuperacao: email });
            }).catch(error => {
                console.log(error)
            })

        navigation.navigate("VerificaEmail", {emailRecuperacao: "gabriel10demetrio@gmail.com"})
    };

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

            <InputValues
                value={email}
                onChangeText={(txt) => setEmail(txt)}

            />

            <Button
                backgroundColor={APP_COLORS.secondary}
                border={APP_COLORS.secondary}
                marginTop={60}
                color={APP_COLORS.white}
                title={"Continuar".toUpperCase()}
                onPress={() =>EnviarEmail()}
                activeOpacity={.8}
            />

        </Container>
    )
}

export default Cadastro;