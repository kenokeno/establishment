import { forEach } from 'lodash';

//import Establishment from './../models/EstablishmentModel';
import labels from '../constants/labels';

//import { createRegistry, getAllRegistries, getRegistryById, updateRegistry, deleteRegistry, updateFieldRegistry } from '../apis';
import { getAllRegistries } from './../apis/establishments';

//https://gitmemory.com/issue/realm/realm-js/1475/492319054
export const createRegistros = () => {
    //createEstablishment();
    //const payload = { model: 'Establishment' };
    let list = getAllRegistries();
    const datos = list.result;
    console.log("Registros: ", datos.length);
    //console.log(datos[0].linkingObjects('CentroDistribucion', 'almacenes'));
    //console.log(datos[0].linkingObjects('Credito', 'cliente'));
    datos.map((item) => {
        console.log("Registro: ", item.nom_estab + " - " + item.nom_vial + " - " + item.nomb_asent);
        return item;
    });
    /*datos.map((item) => {
        console.log(item);
        forEach(item.precios_venta, function (precio_venta) {
            console.log(precio_venta);
            //if (precio_venta.lista_precios.id === 1) valido = true;
        });
        return item;
    });*/
}

function createEstablishment() {
    //const establishment = new Establishment();
    empleado.nombre = 'Nombre Prueba';
    empleado.apellido_paterno = 'ApellidoPaterno';
    empleado.apellido_materno = 'ApellidoMaterno';
    empleado.clave = '12345';
    let payload = {
        registry: empleado,
        model: 'Empleado'
    };
    console.log("Payload: ", payload);
    let msg = createRegistry(payload);
    console.log("MSG: ", msg);
}