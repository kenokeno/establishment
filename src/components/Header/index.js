import React from 'react';
import { Center, Thumbnail, Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import 'moment/locale/es';

import colors from '../../constants/colors';
import { styles } from './styles';

export default function MyHeader({ imageUri }) {
    const hoy = Date.now();
    moment.locale("es");
    //<Thumbnail source={{ uri: imageUri && imageUri }} small />
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 3, y: 1 }}
            colors={[colors.ENCABEZADO_COLOR_G1, colors.ENCABEZADO_COLOR_G2, colors.ENCABEZADO_COLOR_G3]}
            style={styles.linearGradient}>
            <Center>
                <Text style={styles.textTitle}>Negosiuecharhu</Text>
                <Text style={styles.textDate}>{moment(hoy).format('dddd, D [de] MMMM [de] YYYY')}</Text>
            </Center>
        </LinearGradient>
    );
}
