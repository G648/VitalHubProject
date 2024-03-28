import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navegacao } from './src/screens/Auth/Navegacao/Navegacao';
import Login from './src/screens/Auth/Login/Login';
//import das fonts
import { useFonts, MontserratAlternates_600SemiBold, MontserratAlternates_500Medium, MontserratAlternates_700Bold } from '@expo-google-fonts/montserrat-alternates';
import { Quicksand_700Bold, Quicksand_600SemiBold, Quicksand_400Regular, Quicksand_500Medium, Quicksand_300Light } from '@expo-google-fonts/quicksand';
import Cadastro from './src/screens/Auth/Cadastro/Cadastro';
import { VerificaEmail } from './src/screens/Auth/VerificaEmail/VerificaEmail';
import CadastroUser from './src/screens/Auth/CadastroUser/CadastroUser';
import DoctorHome from './src/screens/Doctor/DoctorHome';
import { BottomTabNavigation } from './src/settings/Routes/AppTabNavigationDoctor';
import MedicalRecord from './src/screens/Doctor/MedicalRecord';
import { MockData } from './src/utils/MockData';
import PatientHome from './src/screens/Patient/PatientHome';
import { BottomTabNavigationPatient } from './src/settings/Routes/AppTabNavigationPatient';
import ChooseClinic from './src/screens/Patient/ChooseClinic';
import ChoseDoctor from './src/screens/Patient/ChoseDoctor';
import ChooseDate from './src/screens/Patient/ChooseDate';
import MapViewLocation from './src/screens/Patient/MapViewLocation';
import MedicalRecordPage from './src/screens/Patient/MedicalRecordPage';
import MedicalExamsPhotos from './src/screens/Patient/MedicalExamsPhotos';
import Toast from 'react-native-toast-message';


export default function App() {
  //Instância do StackNavigator
  const Stack = createNativeStackNavigator();

  const [fontsLoaded, fontsError] = useFonts({
    MontserratAlternates_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_700Bold,
    Quicksand_700Bold,
    Quicksand_600SemiBold,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_300Light
  })

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    //Navegação
    //Container
    //StackNavigator
    //StackScreen

    <>
      <NavigationContainer>
        {/* Componente para navegação */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen
            //nome da tela
            name='Login'
            //Componente que será chamado
            component={Login}
            //Titulo da tela
            options={{ title: 'Login' }}

          />

          <Stack.Screen
            name='MedicalExamsPhotos'
            component={MedicalExamsPhotos}
            options={{ title: 'MedicalExamsPhotos' }}
          />

          <Stack.Screen
            name='MedicalRecordPage'
            component={MedicalRecordPage}
            options={{ title: 'MedicalRecordPage' }}
          />

          <Stack.Screen
            name='MapViewLocation'
            component={MapViewLocation}
            options={{ title: 'MapViewLocation' }}
          />

          <Stack.Screen
            name='CadastroUser'
            component={CadastroUser}
            options={{ title: 'CadastroUser' }}
          />

          <Stack.Screen
            name='DoctorHome'
            component={BottomTabNavigation}
            options={{ title: 'DoctorHome' }}

          />

          <Stack.Screen
            name='HomePatient'
            component={BottomTabNavigationPatient}
            options={{ title: 'HomePatient' }}
          />

          <Stack.Screen
            name='ChooseDate'
            component={ChooseDate}
            options={{ title: 'ChooseDate' }}
          />

          <Stack.Screen
            name='ChoseDoctor'
            component={ChoseDoctor}
            options={{ title: 'ChoseDoctor' }}
          />

          <Stack.Screen
            name='ChooseClinic'
            component={ChooseClinic}
            options={{ title: 'ChooseClinic' }}
          />

          <Stack.Screen
            name='Home'
            component={BottomTabNavigation}
            options={{ title: 'Home' }}
          />

          <Stack.Screen
            name='MedicalRecord'
            component={MedicalRecord}
            options={{ title: 'MedicalRecord' }}
          />

          <Stack.Screen
            //nome da tela
            name='Navegacao'
            //Componente que será chamado
            component={Navegacao}
            //Titulo da tela
            options={{ title: 'Navegacao' }}
          />


          <Stack.Screen
            name='Cadastro'
            component={Cadastro}
            options={{ title: 'Cadastro' }}
          />

          <Stack.Screen
            name='VerificaEmail'
            component={VerificaEmail}
            options={{ title: 'VerificaEmail' }}
          />



        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

