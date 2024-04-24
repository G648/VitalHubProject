import styled from "styled-components/native";
import { APP_COLORS } from "../../utils/App_colors";

export const ContainerValidator = styled.View`
    flex-direction: row;
    width: 90%;
    height: 62px;
    justify-content: space-between;
`

export const InputValidation = styled.TextInput.attrs(
    {
        placeholderTextColor: APP_COLORS.primaryV3,
    }
)`
    width: 65px;
    height: 62px;
    border-color: ${APP_COLORS.primaryV3} ;
    border-width:2px;
    border-radius: 5px;
    font-size: 40px;
    color: ${APP_COLORS.primaryV3};
    text-align: center;
    
`

export function InputValidator({
    onChangeText,
    caretHidden
}) {
    return(
            <InputValidation
                keyboardType="numeric"
                maxLength={1}
                onChangeText={onChangeText}
                caretHidden={caretHidden}
            />        
    )
}