import React, { useState, useEffect } from "react";
import {
    Divider, HStack, Box, Text, VStack, Pressable, Heading, AlertDialog,
    Spacer, Icon, Center, View, Modal, Checkbox, useToast, Button,
} from 'native-base';
import colors from '../../../constants/colors';


export default function Around({ navigation }) {


    return (
        <Box textAlign="center" bg={colors.BACKGROUND_COLOR} flex={1} safeAreaTop>
            <Text>Hola mundo!!</Text>
        </Box >
    );
}