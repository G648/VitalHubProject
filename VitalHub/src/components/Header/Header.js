import styled from "styled-components/native";
//import lib linear gradient
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { userDecodeToken } from '../../utils/Auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import PatitentProfile from "../../screens/Patient/PatitentProfile";

export const BoxUser = styled.View`
  gap: 10px;
  margin-top: 10%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ImageUser = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
`;

export const DataUser = styled.View`

`;

export const TextDefault = styled.Text`
  font-size: 14px;
  font-family: "Quicksand_500Medium";
`;

export const NameUser = styled.Text`
  color: #fbfbfb;
  font-size: 16px;
  margin-top: 5px;
  font-family: "MontserratAlternates_600SemiBold";
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fafafa;
  width: ${({ widthContainer = "100%" }) => widthContainer};
`;

export const ContainerHeader = styled(LinearGradient).attrs({
  colors: ["#60BFC5", "#496BBA"],
  start: { x: -0.05, y: 1.08 },
  end: { x: 1, y: 0 },

})`
  height:20%;
  width: 100%;
  padding: 20px;
  padding-bottom: 22px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 0px 0px 15px 15px;
  box-shadow: 0px 4px 15px #00000014;
`;


export const Header = ({
  navigation,
  textValue,
  nameDoctor,
  sourcePhoto
}) => {

  async function SendPhotoToProfile(navigation) {
    const retornoStorage = await AsyncStorage.getItem('token');
    console.log(retornoStorage);
    const token = await userDecodeToken();
    console.log('Role do usuário:', token.role);

    let navigationTarget = token.role === 'Medico' ? 'DoctorProfile' : 'PatitentProfile';

    console.log(navigationTarget);

    navigation.navigate(navigationTarget);
  }

  return (
    <ContainerHeader>

      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}
        activeOpacity={.8}
        onPress={() => SendPhotoToProfile(navigation)}
      >
        <BoxUser>
          <ImageUser source={{ uri: sourcePhoto }} />

          <DataUser>
            <TextDefault>{textValue}</TextDefault>
            <NameUser>{nameDoctor}</NameUser>
          </DataUser>
        </BoxUser>

        {/* material icons */}
        <MaterialIcons name="notifications" size={25} color="#fbfbfb" />
      </TouchableOpacity>

    </ContainerHeader>
  );
};