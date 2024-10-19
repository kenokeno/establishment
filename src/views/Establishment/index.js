import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//import { getClientes } from './../../actions/clientes';
//import { getVisitasToday } from './../../actions/visitas';
import Directory from './Directory';
import Loading from '../../components/Loading';
import messages from '../../constants/messages';
import moment from 'moment';
import 'moment/locale/es';

export default function Establishment({ navigation }) {
    /*
    const dispatch = useDispatch();
    const visitas = useSelector((state) => { return state.visitas.visitas });
    const clientes = useSelector((state) => { return state.clientes.clientes });
    */

    useEffect(() => {
        //dispatch(getClientes());
        //dispatch(getVisitasToday());
    }, []);

    //if (clientes === undefined && visitas === undefined) { return <Loading isVisible={true} text={messages.CARGANDO_DATOS} />; }

    return <Directory navigation={navigation} />;
}