import { Button, View } from "react-native";
import { ComeBack } from "../../../components/GoBackPage/GoBackPage";

export const Navegacao = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ComeBack
                buttonOpacity={0.8}
            />

            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
           
        </View>
    );
}

