import { useEffect, useRef, useState } from "react"
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


export const VerificaEmail = ({ navigation, route }) => {
    const [codigo, setCodigo] = useState("")
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    function focusNextInput(index) {
        if (index < inputs.length - 1) {
            inputs[index + 1].current.focus()
        }
    }

    function focusPrevInput(index) {
        if (index > 0) {
            inputs[index - 1].current.focus()
        }
    }

    async function ValidarCodigo() {
        console.log(codigo);

        await api.post(`/RecuperarSenha/ValidarCodigoRecuperacaoSenha?email=${route.params.emailRecuperacao}&codigo${codigo}`)
            .then(() => {
                navigation.replace("");
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (inputs[0].current != null) {

            inputs[0].current.focus()
        }

    }, [])

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
                textValue={`Digite o código de 4 dígitos enviado para ${route.params.emailRecuperacao}`}

            />
            <ContainerValidator>

                {
                    [0, 1, 2, 3].map((index) => (
                        <InputValidator
                            key={index}
                            ref={inputs[index]}
                            caretHidden={true}
                            onChangeText={(text) => {
                                if (text == "") {
                                    focusPrevInput(index)
                                } else {
                                    const novoCodigo = [...codigo]
                                    novoCodigo[index] = text
                                    setCodigo(novoCodigo.join(''))
                                    focusNextInput(index)
                                }
                            }}
                        />
                    ))
                }
            </ContainerValidator>

            <Button
                onPress={() => ValidarCodigo()}
                title={"Entrar".toUpperCase()}
                activeOpacity={.8}
                backgroundColor={APP_COLORS.secondary}
                border={APP_COLORS.secondary}
                color={APP_COLORS.white}
                marginTop={60}
            // onPress={() => navigation.navigate('RecoverPassword')}
            />

            <UnderlinedLink
                textIntput={"Reenviar Código"}
                ColorText={APP_COLORS.secondaryV1}
                buttonOpacity={.8}
            />
        </Container>
    )
}