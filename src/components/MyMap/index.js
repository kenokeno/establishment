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