import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, View, Dimensions, StatusBar, Animated, useWindowDimensions
    , FlatList
} from 'react-native';
import {
    Text, HStack, Avatar, VStack, Icon,
    Pressable, Actionsheet, Button, useDisclose, Box,
    ScrollView, AspectRatio, Image, Center, Stack, Heading,
    useColorModeValue, KeyboardAvoidingView
} from 'native-base';
import { TabView, SceneMap } from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { isEmpty, isNull, isObject, isArray, isUndefined } from 'lodash';
import filter from 'lodash.filter';
//import MapView, { MAP_TYPES, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import MapboxGL from '@rnmapbox/maps'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import paths from './../../../constants/paths';
import labels from './../../../constants/labels';
import { SwipeListView } from 'react-native-swipe-list-view';
import EstablishmentModel from './../../../models/EstablishmentModel';
import { getAllRegistries } from './../../../apis/establishments';
import Title from './../../../components/Title';
import SearchBar from './../../../components/SearchBar';
import colors from './../../../constants/colors';
import { styles } from './styles';

const token = "pk.eyJ1IjoiNGxmcjNkMC0iLCJhIjoiY2xnOHp4MGlpMDI3NTNycWl0MDAxdjRuaCJ9.ktRlIYt1QU9WoA_vOhNYuQ"
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(token)

export default function Directory({ navigation }) {
    const [listData, setListData] = useState([]);
    const [listDataFull, setListDataFull] = useState(getAllRegistries().result);
    const coordinates = [-101.615906, 19.501513]
    const [textSearch, setTextSearch] = useState("")
    const [query, setQuery] = useState("")
    const [msgs, setMsgs] = useState([])
    const [chat, setChat] = useState([])
    const [reference, setReference] = useState(null);
    const flatList = React.useRef()
    const [store, setStore] = useState({})

    /* PREGUNTAS */
    const tener = new RegExp("(ESTA|TIENES|TIENE|TENÉS|TENES)")
    const abierto = /ABIERTO/
    const donde = /DONDE/
    const como = /COMO/
    const que = /QUE/

    const llegar = new RegExp("(LLEGO|ARRIVO|ARRIBO|LLEGAR|VOY)")
    const ruta = new RegExp("(COMBI|RUTA|TRANSPORTE|CAMION)")
    const hora = new RegExp("(HORA|AQUEHORA|AQUIHORA|MOMENTO)")
    const cerrar = new RegExp("(CIERRA|CIERRAS)")
    const estacionamiento = new RegExp("(ESTACIONAMIENTO|ESTACIONO|ESTACIONÓ|APARCAR|APARCO|APARCÓ)")


    /***************/

    const layout = useWindowDimensions();

    const options = [{ "icon": "church", "name": "Templos", "filter": "templo" },
    { "icon": "store", "name": "Abarrotes", "filter": "abarrotes" },
    { "icon": "food", "name": "Restaurante", "filter": "comida" },
    { "icon": "gas-station", "name": "Gasolinera", "filter": "gas" },
    { "icon": "bed-empty", "name": "Hotel", "filter": "hotel" },
    { "icon": "car-clock", "name": "Estacionamiento", "filter": "estacionamiento" },
    { "icon": "gift", "name": "Regalos", "filter": "regalos" },]

    const store_test = {
        "id": 7015321,
        "clee": "16066561432001071000000000U9",
        "nom_estab": "CIBER LUCY",
        "raz_social": "",
        "codigo_act": 561432,
        "nombre_act": "Servicios de acceso a computadoras",
        "per_ocu": "0 a 5 personas",
        "tipo_vial": "CALLE",
        "nom_vial": "VASCO DE QUIROGA",
        "tipo_v_e_1": "AVENIDA",
        "nom_v_e_1": "LAZARO CARDENAS",
        "tipo_v_e_2": "CALLE",
        "nom_v_e_2": "15 DE MAYO",
        "tipo_v_e_3": "CALLE",
        "nom_v_e_3": "15 DE MAYO",
        "numero_ext": "",
        "letra_ext": "SN",
        "edificio": "",
        "edificio_e": "",
        "numero_int": "",
        "letra_int": "",
        "tipo_asent": "BARRIO",
        "nomb_asent": "SAN MIGUEL",
        "tipoCenCom": "",
        "nom_CenCom": "",
        "num_local": "",
        "cod_postal": 61620,
        "cve_ent": 16,
        "entidad": "MICHOAC�N DE OCAMPO",
        "cve_mun": 66,
        "municipio": "P�tzcuaro",
        "cve_loc": 9,
        "localidad": "Cuanajo",
        "ageb": 75,
        "manzana": 1,
        "telefono": 4341217119,
        "correoelec": "",
        "www": "",
        "tipoUniEco": "Fijo",
        "latitud": 19.48533233,
        "longitud": -101.5078327,
        "fecha_alta": "2019-11",
        "horario": "De 8:00 a.m. a 2:00 p.m. y de 4:00 p.m. a 7:00 p.m.",
        "images": [{ "image": "https://www.xprsol.com/images/todoparaciber.png" }, { "image": "https://www.pantallasamigas.net/wp-content/uploads/2009/05/ciber-internet-videojuegos-ordenador-menores.jpg", },
        { "image": "https://www.efekto.tv/wp-content/uploads/2017/04/Screen-Shot-2017-04-21-at-4.50.03-PM.png", "image": "https://http2.mlstatic.com/D_NQ_NP_949511-MLM46115954742_052021-O.jpg", },
        { "image": "https://www.zonacomercial.com.mx/fotosclientes/3012.jpg", }],
        "estacionamiento_ocu": 20,
        "calles_estacionamiento": "Calle Madrigral y Avenida José María Morelos y Pavón",
        "rutas_transporte_pub": "Ruta amarilla, Ruta naranja",
        "abierto": "si",
        "sucursales": "",
        "descripcion_servicios": "Copias, Acta de Nacimiento y CURP",
        "descripcion_productos": "Venta de consumibles de computadora"
    }
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const renderFilters = ({ item }) => {
        return (
            <Pressable
                onPress={() => handleSearch(item.filter)}
                px={2}
                //bg={colors.TERTIARY_COLOR}
                bg="rgba(250, 250, 250, 0.1)"
                borderRadius={8}
                style={[styles.pressableHiddenSwipeList, { marginHorizontal: 2 }]}
                _pressed={{
                    opacity: 0.5
                }}
            >
                <HStack px={2}>
                    <Icon as={MaterialCommunityIcons} name={item.icon} color={colors.PRIMARY_COLOR} size="xl" _dark={{
                        color: "#000000"
                    }} />
                    {/*<Text px={2}>{item.name}</Text>*/}
                </HStack>
            </Pressable>
        )
    }

    const renderImages = ({ item }) => {
        return (
            <Box alignItems="center" my={2}>
                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <Box>
                        <AspectRatio w="100%" ratio={16 / 6}>
                            <Image source={{
                                uri: item.image
                            }} alt="image" />
                        </AspectRatio>
                    </Box>
                </Box>
            </Box>)
    }

    const handleSearch = (text) => {
        if (text === "") {
            setListData([])
            return
        }
        const data = filter(listDataFull, data => {
            return contains(data, text);
        })
        setListData(data);
    }

    const renderMsgs = ({ item }) => {
        return (
            <View px={2} style={styles.msg} >
                <Text px={2} style={item.type == "request" ? styles.left : styles.rigth}>{item.value}</Text>
            </View>
        )
    }

    const handleChat = (text) => {
        if (text === "") {
            return
        }
        const msg = { value: text, type: 'request', }
        msgs.push(msg)
        text = text.toUpperCase()
        var response = { value: 'No te entiendo...', type: 'response' }
        if (tener.test(text) && abierto.test(text))
            response = { value: store.abierto + ', el horario de atención es ' + store.horario, type: 'response' }
        if (como.test(text) && llegar.test(text) || que.test(text) && ruta.test(text))
            response = { value: store.rutas_transporte_pub, type: 'response' }
        if (hora.test(text) && cerrar.test(text))
            response = { value: 'El horario de atención es ' + store.horario, type: 'response' }
        if (donde.test(text) && estacionamiento.test(text) || tener.test(text) && estacionamiento.test(text))
            response = { value: store.estacionamiento_ocu > 0 ? "Tenemos estacionamiento, o puedes estacionarte en " + store.calles_estacionamiento : "No tenemos estacionamiento pero puedes estacionarte en las calles " + store.calles_estacionamiento, type: 'response' }
        msgs.push(response)
        setChat(msgs)
    }

    const contains = (data, query) => {
        if (query === "") {
            setQuery("")
            return true
        }

        for (const property in data) {
            const dato = stringifyObject(data[property]);
            if (isUndefined(dato)) return false;
            if (dato.toLowerCase().includes(query.toLowerCase())) {
                setQuery(query.toLowerCase())
                return true;
            }
        }
        return false
    }
    //https://stackoverflow.com/questions/9382167/serializing-object-that-contains-cyclic-object-value
    function stringifyObject(obj) {
        if (isNull(obj)) {
            return;
        }
        if (isArray(obj) || !isObject(obj)) {
            return obj.toString()
        }
        var seen = [];
        return JSON.stringify(
            obj,
            function (key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0)
                        return
                    seen.push(val)
                }
                return val
            }
        );
    }

    const defaultStyle = {
        version: 8,
        name: 'Land',
        sources: {
            map: {
                type: 'raster',
                tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
                minzoom: 1,
                maxzoom: 19,
            },
        },
        layers: [
            {
                id: 'background',
                type: 'background',
                paint: {
                    'background-color': '#f2efea',
                },
            },
            {
                id: 'map',
                type: 'raster',
                source: 'map',
                paint: {
                    'raster-fade-duration': 100,
                },
            },
        ],
    };

    const renderIcons = () => {
        switch (query) {
            case 'templo':
                return <MaterialCommunityIcons name="church" size={30} style={{ color: 'brown' }} />;
            case 'abarrotes':
                return <MaterialCommunityIcons name="store" size={30} style={{ color: 'red' }} />;
            case 'comida':
                return <MaterialCommunityIcons name="food" size={30} style={{ color: 'orange' }} />;
            case 'gas':
                return <MaterialCommunityIcons name="gas-station" size={30} style={{ color: 'green' }} />;
            case 'hotel':
                return <MaterialCommunityIcons name="bed-empty" size={30} style={{ color: 'pink' }} />;
            case 'estacionamiento':
                return <MaterialCommunityIcons name="car-clock" size={30} style={{ color: 'violet' }} />;
            case 'regalos':
                return <MaterialCommunityIcons name="gift" size={30} style={{ color: 'violet' }} />;
            default:
                return <MaterialCommunityIcons name="map-marker" size={30} style={{ color: 'red' }} />;
        }
    }

    const initialLayout = {
        width: Dimensions.get('screen').width
    };

    const renderScene = SceneMap({
        first: () => <FirstRoute store={store}></FirstRoute>,
        second: () => <SecondRoute store={store} renderItem={renderImages}></SecondRoute>,
        third: () => <ThirdRoute store={store}></ThirdRoute>,
        fourth: FourthRoute
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([{
        key: 'first',
        title: 'Info'
    }, {
        key: 'second',
        title: 'Catalogo'
    }, {
        key: 'third',
        title: 'Arrivo'
    }, {
        key: 'fourth',
        title: 'Sucursales'
    }]);

    const renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return <Box flexDirection="row">
            {props.navigationState.routes.map((route, i) => {
                const opacity = props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
                });
                const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
                const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
                return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
                    <Pressable onPress={() => {
                        console.log(i);
                        setIndex(i);
                    }}>
                        <Animated.Text style={{
                            color
                        }}>{route.title}</Animated.Text>
                    </Pressable>
                </Box>;
            })}
        </Box>;
    };

    const onSelected = (data) => {
        setStore(data)
        //setStore(store_test)
        setMsgs([])
        setChat([])

    }

    return (
        <>
            <Box flex="1" safeAreaTop>
                {/*<Title titleWithoutPlus={labels.LIST_ESTABLISHMENT_TITLE} />*/}
                <MapboxGL.MapView
                    style={{ flex: 1 }}
                //                styleJSON={JSON.stringify(defaultStyle)}
                >
                    <MapboxGL.Camera
                        zoomLevel={12}
                        centerCoordinate={coordinates}
                    />
                    <MapboxGL.PointAnnotation key={"localPositio"} id={"localPositio"} coordinate={coordinates} ><MaterialCommunityIcons name="map-marker-radius" size={30} style={{ color: 'blue' }} /></MapboxGL.PointAnnotation>
                    {listData.map((data) =>
                        <MapboxGL.PointAnnotation key={`location_${data.id}`} id={`location_${data.id}`} coordinate={[data.longitud, data.latitud]} onSelected={() => { onSelected(data); onOpen(); }}>
                            <MapboxGL.Callout
                                title={`${data.nom_estab}`}
                                containterStyle={{ flex: 1, background: '#fff' }}
                            />
                            {
                                renderIcons()
                            }
                        </MapboxGL.PointAnnotation>
                    )}

                </MapboxGL.MapView>
                < SearchBar text={textSearch} handleSearch={handleSearch} icon={FontAwesome} iconName='search' position="absolute" placeholder="Buscar" />
                <Box py={2} rounded="lg" overflow="hidden" mx={8}
                    style={{
                        position: 'absolute',
                        top: 50,
                    }}>
                    <FlatList
                        horizontal
                        data={options}
                        renderItem={renderFilters}
                        keyExtractor={(item, index) => index}
                        showsHorizontalScrollIndicator={false}
                    />
                </Box>
            </Box >

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    {/*
                    <SwipeListView
                        data={listData}
                        renderItem={renderEstablishment}
                        renderHiddenItem={false ? renderHiddenItem : null}
                        rightOpenValue={false ? -124 : -62}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={true}
                    />
                    */}
                    <Box py={3}>
                        <VStack flex={1} w="100%" space={2} >
                            <SafeAreaView style={{
                                flex: 1,
                                width: "100%",
                            }}>
                                < SearchBar
                                    //text={textSearch}
                                    handleSearch={handleChat}
                                    icon={FontAwesome}
                                    iconName='send'
                                    position='relative'
                                    placeholder="Nuevo Mensaje" />

                                <Stack h="20%" mx={3} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                                    borderColor: "coolGray.600",
                                    backgroundColor: "gray.700"
                                }} _web={{
                                    shadow: 2,
                                    borderWidth: 0
                                }} _light={{
                                    backgroundColor: "gray.50"
                                }}
                                >
                                    <FlatList
                                        ref={flatList}
                                        data={chat}
                                        onContentSizeChange={() => {
                                            /*if (flatList.current) {
                                                flatList.current.scrollToEnd({ animated: true })
                                            }*/
                                        }}
                                        renderItem={renderMsgs}
                                        keyExtractor={(item, index) => index}
                                    />
                                </Stack>
                                <TabView navigationState={{
                                    index,
                                    routes
                                }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={{ width: layout.width }} style={{
                                    //marginTop: StatusBar.currentHeight
                                }} />
                            </SafeAreaView>
                        </VStack>
                    </Box>
                </Actionsheet.Content>
            </Actionsheet >
        </>
    );
    /*
    <SwipeListView
                dataSet={datos.result}
                renderDetail={renderEstablishment}
                titleWithoutPlus={labels.LIST_ESTABLISHMENT_TITLE}
                firstOption={showMap}
                withOptions={true}
                firstAsIcon={MaterialCommunityIcons}
                firstNameIcon={"map-marker"}
            //secondOption={share}
            />
    */
}

const FirstRoute = (props) => {
    return (
        <Box alignItems="center" my={2}>
            <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>
                <Box>
                    <AspectRatio w="100%" ratio={16 / 4}>
                        <Image source={{
                            uri: props.store.images[0].image
                        }} alt="image" />
                    </AspectRatio>
                    <Center bg="violet.500" _dark={{
                        bg: "violet.400"
                    }} _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs"
                    }} position="absolute" bottom="0" px="3" py="1.5">
                        Abierto
                    </Center>
                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {props.store.nom_estab}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "violet.500"
                        }} _dark={{
                            color: "violet.400"
                        }} fontWeight="500" ml="-0.5" mt="-1">
                            {
                                props.store.tipo_vial + ' '
                                + props.store.nom_vial + ' '
                                + props.store.numero_ext
                                + props.store.letra_ext
                                + props.store.edificio + ' '
                                + props.store.edificio_e + ' '
                                + props.store.numero_int
                                + props.store.letra_int
                            }
                        </Text>
                    </Stack>
                    <Text fontWeight="400">
                        {props.store.nombre_act}
                    </Text>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                        <VStack>
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                Teléfono: {props.store.telefono}
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="400">
                                Correo: {props.store.correoelec}
                            </Text>
                        </VStack>
                    </HStack>
                </Stack>
            </Box>
        </Box>)
}

const SecondRoute = (props) =>
    <Box flex={1} w="100%" alignItems="center" my={2} overflow="hidden" >
        <VStack flex={1} w="100%">
            <FlatList
                horizontal
                data={props.store.images}
                renderItem={props.renderItem}
                keyExtractor={(item, index) => index}
            //showsHorizontalScrollIndicator={false}
            />
            <Stack p="4" space={3}>
                <Stack space={2}>
                    <Heading size="md" ml="-1">
                        Servicios
                    </Heading>

                </Stack>
                <Text fontWeight="400">
                    {props.store.descripcion_servicios}
                </Text>
                <Stack space={2}>
                    <Heading size="md" ml="-1">
                        Productos
                    </Heading>

                </Stack>
                <Text fontWeight="400">
                    {props.store.descripcion_productos}
                </Text>
            </Stack>
        </VStack>
    </Box>
const ThirdRoute = (props) => <Box>
    <HStack alignItems="center" space={4} justifyContent="space-between">
        <Image source={{
            uri: "https://ubicatemichoacan.com/assets/img/combis/verde.png"
        }} alt="Alternate Text" size="xs" />
        <Image source={{
            uri: "https://ubicatemichoacan.com/assets/img/combis/palomaAzul.png"
        }} alt="Alternate Text" size="xs" />
        <Image source={{
            uri: "https://ubicatemichoacan.com/assets/img/combis/crema.png"
        }} alt="Alternate Text" size="xs" />
    </HStack>
    <Stack p="2" space={3}>
        <Stack space={2}>
            <Heading size="md" ml="-1">
                Rutas de transporte público
            </Heading>
        </Stack>
        <Text fontWeight="400">
            {props.store.rutas_transporte_pub}
        </Text>
        <Stack space={2}>
            <Heading size="md" ml="-1">
                Estacionamiento para
            </Heading>
        </Stack>
        <Text fontWeight="400">
            {props.store.estacionamiento_ocu}
        </Text>
        <Stack space={2}>
            <Heading size="md" ml="-1">
                Calles para aparcamiento
            </Heading>
        </Stack>
        <Text fontWeight="400">
            {props.store.calles_estacionamiento}
        </Text>
    </Stack>
</Box>

const FourthRoute = () => <Center flex={1} my="4">
    Sin sucursale{' '}
</Center>;