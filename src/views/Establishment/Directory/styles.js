import { StyleSheet } from 'react-native';
import colors from './../../../constants/colors';

export const styles = StyleSheet.create({
    generalFontSize: {
        fontSize: 10,
    },
    detailFontSize: {
        fontSize: 8,
    },
    icon: {
        marginHorizontal: 15,
    },
    pressableHiddenSwipeList: {
        justifyContent: "center",
        //borderColor: colors.BACKGROUND_COLOR,//separador
        //borderWidth: 1,
    },
    msg: {
        width: "100%",
    },
    left: {
        fontSize: 18,
        //fontFamily: "monospace",
        width: "auto",
        maxWidth: "60%",
        padding: 14,
        margin: 8,
        color: "#000",
        backgroundColor: "#b3bfca",
        borderRadius: 15,
        alignSelf: 'flex-start'
    },
    rigth: {
        fontSize: 18,
        //fontFamily: "monospace",
        width: "auto",
        maxWidth: "60%",
        padding: 14,
        margin: 8,
        color: "#ffffff",
        backgroundColor: "#1c1f46",
        borderRadius: 15,
        textAlign: 'right',
        alignSelf: 'flex-end'
    }
})