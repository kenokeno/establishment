import React, { useState, useEffect } from 'react';
import { Box, Pressable, VStack, Text, HStack, Divider, Icon } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Colors from '../constants/colors';
import { getItem } from '../apis';
//https://oblador.github.io/react-native-vector-icons/
// https://blog.crowdbotics.com/how-to-create-a-custom-tab-bar-in-react-native/

import menus from '../constants/menus'
import Routes from './stackRoutes';
import paths from '../constants/paths';
import { createRegistros } from './../tests';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//https://javascript.tutorialink.com/react-navigation-v5-hide-bottom-tab-in-specific-screens/
//https://stackoverflow.com/questions/51995312/combine-createstacknavigator-and-createbottomtabnavigator

// SISTEMA DE NAVEGACIÓN DE TAB NAVIGATOR, QUE EN ESTE CASO TENDREMOS LOS NODOS "A BORDO" Y "EN RUTA"
// Y DE ESTOS SE DERIVARÁN TODOS LOS ARBOLES DE NAVEGACIÓN DE RECIBIR PRODUCTO, INVENTARIO, ETC.
const TabNavigator = ({ navigation }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.PRIMARY_COLOR,
                tabBarActiveBackgroundColor: Colors.BACKGROUND_COLOR,
                tabBarInactiveBackgroundColor: Colors.BACKGROUND_COLOR,
                tabBarInactiveTintColor: Colors.SECONDARY_FONT_COLOR,
            }}
        >
            <Tab.Screen
                name={paths.DIRECTORY_ESTABLISHMENT}
                component={TabDirectoryEstablishmentStackNavigator}
                options={{
                    title: menus.DIRECTORY_ESTABLISHMENT,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="store-search" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={paths.AROUND_ESTABLISHMENT}
                component={TabAroundEstablishmentStackNavigator}
                options={{
                    title: menus.AROUND_ESTABLISHMENT,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="store-marker" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={paths.FAVORIT_ESTABLISHMENT}
                component={TabFavoritEstablishmentStackNavigator}
                options={{
                    title: menus.FAVORIT_ESTABLISHMENT,
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="favorite" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const getIcon = (screenName) => {
    switch (screenName) {
        case 'Inicio':
            return "home"
        default:
            return undefined
    }
}

// SE PERSONALIZA EL DRAWER NAVIGATOR AQUI. CONFIGURANDO SUS ESTILOS Y LAS OPCIONES QUE QUEREMOS
// QUE APAREZCAN EN EL MENU DE NAVEGACIÓN, SUS ICONOS, ETC.
function CustomDrawerContent(props) {
    const [userInfo, setUserInfo] = useState(null); // SE USA PARA OBTENER LA INFORMACIÓN GUARDADA DEL LOGIN DE LA APLIACIÓN

    useEffect(() => {
        //loadUserInfo();
    }, []);

    // OBTENEMOS LOS DATOS DE ACCESO DEL LOGIN A LA APLICACIÓN QUE SE GUARDARON EN EL COMPONENTE LOGIN.
    const loadUserInfo = async () => {
        let user = await getItem('@user_info'); // BUSCAMOS EN EL ARCHIVO LOCAL DEL TELEFONO DONDE SE GUARDARON LOS DATOS EL DATO @USER_INFO
        user = JSON.parse(user); // LO CONFIGURAMOS PARA QUE PUEDA TRATADO COMO OBJETO JSON LOS DATOS DEL ARCHIVO OBTENIDOS
        setUserInfo(user);
    }

    return (
        <DrawerContentScrollView {...props} safeArea>
            <VStack space={6} my={2} mx={1}>
                <Box px={4}>
                    <Text bold color="gray.700">Menu</Text>
                    <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>Tu app</Text>
                </Box>
                <VStack divider={<Divider />} space={4}>
                    <VStack space={3}>
                        {props.state.routeNames.map((name, index) => {
                            return name === menus.PRODUCTO || name === menus.CLIENTE || name === menus.LOGIN ? null :
                                <Pressable
                                    key={index}
                                    px={5}
                                    py={3}
                                    rounded="md"
                                    bg={index === props.state.index ? 'rgba(6, 182, 212, 0.1)' : 'transparent'}
                                    onPress={(event) => {
                                        props.navigation.navigate(name, { navigation: props.navigation });
                                    }}
                                >
                                    <HStack space={7} alignItems="center">
                                        <Icon
                                            color={index === props.state.index ? 'primary.500' : 'gray.500'}
                                            size={5} as={<MaterialCommunityIcons name={getIcon(name)} />} />
                                        <Text fontWeight={500} color={index === props.state.index ? 'primary.500' : 'gray.700'}>
                                            {name}
                                        </Text>
                                    </HStack>
                                </Pressable>
                        })}
                    </VStack>
                    <VStack space={5}>
                        <Text fontWeight={500} fontSize={14} px={5} color="gray.500">Listas</Text>
                        <VStack space={3}>
                            <Pressable
                                px={5}
                                py={3}
                                onPress={(event) => {
                                    //props.navigation.navigate(menus.PRODUCTO);
                                }}
                            >
                                <HStack space={7} alignItems="center">
                                    <Icon
                                        color='gray.500'
                                        size={5} as={<MaterialCommunityIcons name='archive' />} />
                                    <Text color='gray.700' fontWeight={500}>
                                        Opciones de Men
                                    </Text>
                                </HStack>
                            </Pressable>
                            <Pressable
                                px={5}
                                py={3}
                                onPress={() => createRegistros()}
                            >
                                <HStack space={7} alignItems="center">
                                    <Icon
                                        color='gray.500'
                                        size={5} as={<MaterialCommunityIcons name='test-tube' />} />
                                    <Text fontWeight={500} color='gray.700'>
                                        Test
                                    </Text>
                                </HStack>
                            </Pressable>
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
        </DrawerContentScrollView >
    );
}
//https://dev.to/easybuoy/combining-stack-tab-drawer-navigations-in-react-native-with-react-navigation-5-da
//https://snack.expo.dev/@unionnetzym/react-navigation-drawer-navigator-nested-inside-tab-navigator
const DrawerNavigator = () => {
    return (
        <Box safeArea flex={1}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                {/* SE ENLAZA EL ARBOL DE NAVEGACIÓN DEL TAB AL DRAWER NAVIGATOR*/}
                <Drawer.Screen name={menus.MAIN_TAB} component={TabNavigator} options={{
                    headerShown: false,
                }} />
            </Drawer.Navigator>
        </Box>
    );
};

// SECREA EL ARBOL DE NAVEGACIÓN DE ABORDO QUE SE UNIRA AL TAB NAVIGATOR
const TabDirectoryEstablishmentStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={paths.DIRECTORY_ESTABLISHMENT_HOME}
                component={Routes.Establishment}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

// SECREA EL ARBOL DE NAVEGACIÓN DE EN RUTA QUE SE UNIRA AL TAB NAVIGATOR
const TabAroundEstablishmentStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={paths.AROUND_ESTABLISHMENT_HOME}
                component={Routes.Around}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

// SECREA EL ARBOL DE NAVEGACIÓN DE EN RUTA QUE SE UNIRA AL TAB NAVIGATOR
const TabFavoritEstablishmentStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={paths.FAVORIT_ESTABLISHMENT_HOME}
                component={Routes.Favorites}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

// SISTEMA DE NAVEGACIÓN PRINCIPAL DRAWER NAVIGATOR, DE ESTE MODO SE CONFIGURA PARA QUE SEA
// EL NODO RAIZ DEL CUAL LOS DEMAS NODOS DE NAVEGACIÓN SE UNIRAN DE ALGÚN MODO, YA SEA
// DIRECTAMENTE AL NODO RAIZ O A ALGUNO DE LOS NODOS HIJOS DE DRAWER NAVIGATOR
export default function AppStack() {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
}