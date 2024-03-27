import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DoctorHome from "../../screens/Doctor/DoctorHome";
import DoctorProfile from '../../screens/Doctor/DoctorProfile';
import { FontAwesome6 } from '@expo/vector-icons';
import { APP_COLORS } from '../../utils/App_colors';
import styled from 'styled-components/native';

const Tab = createBottomTabNavigator();

export const ContainerBottomTabNavigation = styled.View`
    background-color: ${({isFocused}) => isFocused ? APP_COLORS.SecondaryLight : APP_COLORS.whitev1};
    align-items:center;
    padding: 10px;
    flex-direction: row;
    gap: 5px;
    border-radius: 50px;
`

export const TextBottomTabNavigation = styled.Text`
    color: ${({isFocused}) => !isFocused ? APP_COLORS.secondaryV1 : null};
`

export function BottomTabNavigation() {
    return (
            <Tab.Navigator
                initialRouteName="Agenda"

                screenOptions={({route}) => ({
                    headerShown:false,
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name == 'Agenda') {
                            iconName = focused ? "calendar-check" : "calendar-check"
                        }else if (route.name == 'Perfil') {
                            iconName = focused ? "circle-user" : "circle-user"
                        }

                        return(
                            <ContainerBottomTabNavigation
                                isFocused={focused}
                            >
                                <FontAwesome6 name={iconName} size={size} color={color} />
                                {focused ? <TextBottomTabNavigation> {route.name} </TextBottomTabNavigation> : null}

                            </ContainerBottomTabNavigation>
                        )
                    },
                    tabBarActiveTintColor: APP_COLORS.secondaryV2,
                    tabBarInactiveTintColor: APP_COLORS.grayV2,
                    tabBarShowLabel:false,
                    tabBarStyle: {flex: .08}
                })}
            >
                <Tab.Screen name="Agenda" component={DoctorHome} />
                <Tab.Screen name="Perfil" component={DoctorProfile} />
            </Tab.Navigator>

    )
}