import { View, Text } from 'react-native'
import React from 'react'
import { Container } from '../../../components/Container/Style'
import { ComeBack } from '../../../components/GoBackPage/GoBackPage'
import { Logo } from '../../../components/Logo/Style'
import { Title } from '../../../components/Title/Style'
import { ParagrafText } from '../../../components/Paragraf/Paragraf'
import { APP_COLORS } from '../../../utils/App_colors'
import { Input, InputValues } from '../../../components/Input/Input'
import { InputStyle } from '../../Doctor/MedicalRecord'
import { Button } from '../../../components/Button/Button'

export default function RecoverPassword({ navigation }) {
    return (
        <Container>
            <ComeBack
                buttonOpacity={.8}
                isClosable={true}
                onClick={() => navigation.navigate('Login')}
            />

            <Logo
                source={require('../../../assets/Images/LogoBlue.png')}
            />

            <Title>
                Redefinir senha
            </Title>

            <ParagrafText
                FontColorParagrafo={APP_COLORS.grayV3}
                FontSizeParagrafo={16}
                textValue={"Insira e confirme a sua nova senha"}
            />

            <InputValues
                placeholder='Nova senha'
                secureTextEntry={true}
            />

            <InputValues
                placeholder='Confirmar senha'
                secureTextEntry={true}
            />

            <Button
                activeOpacity={.8}
                backgroundColor={APP_COLORS.secondary}
                border={APP_COLORS.secondary}
                color={APP_COLORS.white}
                height={48}
                title={"Confirmar nova senha"}
                onPress={() => navigation.navigate('Login')}
                marginTop={30}
            />
        </Container>
    )
}