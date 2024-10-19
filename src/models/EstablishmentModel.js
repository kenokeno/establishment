export default class Establishment {
    id: number;
    clee: string;
    nom_estab: string;
    raz_social: string;
    codigo_act: number;
    nombre_act: string;
    per_ocu: string;
    tipo_vial: string;
    nom_vial: string;
    tipo_v_e_1: string;
    nom_v_e_1: string;
    tipo_v_e_2: string;
    nom_v_e_2: string;
    tipo_v_e_3: string;
    nom_v_e_3: string;
    numero_ext: number;
    letra_ext: string;
    edificio: string;
    edificio_e: string;
    numero_int: number;
    letra_int: string;
    tipo_asent: string;
    nomb_asent: string;
    tipoCenCom: string;
    nom_CenCom: string;
    num_local: number;
    cod_postal: number;
    cve_ent: number;
    entidad: string;
    cve_mun: number;
    municipio: string;
    cve_loc: number;
    localidad: string;
    ageb: string;
    manzana: number;
    telefono: number;
    correoelec: string;
    www: string;
    tipoUniEco: string;
    latitud: number;
    longitud: number;
    fecha_alta: string;

    constructor(
        id = 0,
        clee = 0,
        nom_estab = '',
        raz_social = '',
        codigo_act = 0,
        nombre_act = '',
        per_ocu = '',
        tipo_vial = '',
        nom_vial = '',
        tipo_v_e_1 = '',
        nom_v_e_1 = '',
        tipo_v_e_2 = '',
        nom_v_e_2 = '',
        tipo_v_e_3 = '',
        nom_v_e_3 = '',
        numero_ext = 0,
        letra_ext = '',
        edificio = '',
        edificio_e = '',
        numero_int = 0,
        letra_int = '',
        tipo_asent = '',
        nomb_asent = '',
        tipoCenCom = '',
        nom_CenCom = '',
        num_local = 0,
        cod_postal = 0,
        cve_ent = 0,
        entidad = '',
        cve_mun = 0,
        municipio = '',
        cve_loc = 0,
        localidad = '',
        ageb = '',
        manzana = 0,
        telefono = 0,
        correoelec = '',
        www = '',
        tipoUniEco = '',
        latitud = 0,
        longitud = 0,
        fecha_alta = '') {
        this.id = id;
        this.clee = clee;
        this.nom_estab = nom_estab;
        this.raz_social = raz_social;
        this.codigo_act = codigo_act;
        this.nombre_act = nombre_act;
        this.per_ocu = per_ocu;
        this.tipo_vial = tipo_vial;
        this.nom_vial = nom_vial;
        this.tipo_v_e_1 = tipo_v_e_1;
        this.nom_v_e_1 = nom_v_e_1;
        this.tipo_v_e_2 = tipo_v_e_2;
        this.nom_v_e_2 = nom_v_e_2;
        this.tipo_v_e_3 = tipo_v_e_3;
        this.nom_v_e_3 = nom_v_e_3;
        this.numero_ext = numero_ext;
        this.letra_ext = letra_ext;
        this.edificio = edificio;
        this.edificio_e = edificio_e;
        this.numero_int = numero_int;
        this.letra_int = letra_int;
        this.tipo_asent = tipo_asent;
        this.nomb_asent = nomb_asent;
        this.tipoCenCom = tipoCenCom;
        this.nom_CenCom = nom_CenCom;
        this.num_local = num_local;
        this.cod_postal = cod_postal;
        this.cve_ent = cve_ent;
        this.entidad = entidad;
        this.cve_mun = cve_mun;
        this.municipio = municipio;
        this.cve_loc = cve_loc;
        this.localidad = localidad;
        this.ageb = ageb;
        this.manzana = manzana;
        this.telefono = telefono;
        this.correoelec = correoelec;
        this.www = www;
        this.tipoUniEco = tipoUniEco;
        this.latitud = latitud;
        this.longitud = longitud;
        this.fecha_alta = fecha_alta;
    }

    getRealmObject() {
        return {
            id: this.id,
            clee: this.clee,
            nom_estab: this.nom_estab,
            raz_social: this.raz_social,
            codigo_act: this.codigo_act,
            nombre_act: this.nombre_act,
            per_ocu: this.per_ocu,
            tipo_vial: this.tipo_vial,
            nom_vial: this.nom_vial,
            tipo_v_e_1: this.tipo_v_e_1,
            nom_v_e_1: this.nom_v_e_1,
            tipo_v_e_2: this.tipo_v_e_2,
            nom_v_e_2: this.nom_v_e_2,
            tipo_v_e_3: this.tipo_v_e_3,
            nom_v_e_3: this.nom_v_e_3,
            numero_ext: this.numero_ext,
            letra_ext: this.letra_ext,
            edificio: this.edificio,
            edificio_e: this.edificio_e,
            numero_int: this.numero_int,
            letra_int: this.letra_int,
            tipo_asent: this.tipo_asent,
            nom_asent: this.nomb_asent,
            tipoCenCom: this.tipoCenCom,
            nom_CenCom: this.nom_CenCom,
            num_local: this.num_local,
            cod_postal: this.cod_postal,
            cve_ent: this.cve_ent,
            entidad: this.entidad,
            cve_num: this.cve_mun,
            municipio: this.municipio,
            cve_loc: this.cve_loc,
            localidad: this.localidad,
            ageb: this.ageb,
            manzana: this.manzana,
            telefono: this.telefono,
            correoelec: this.correoelec,
            www: this.www,
            tipoUniEco: this.tipoUniEco,
            latitud: this.latitud,
            longitud: this.longitud,
            fecha_alta: this.fecha_alta,
        };
    }

    updateObjectInfo(establishment: any) {
        if (!establishment)
            return;
        establishment['id'] = this.id;
        establishment['clee'] = this.clee;
        establishment['nom_estab'] = this.nom_estab;
        establishment['raz_social'] = this.raz_social;
        establishment['codigo_act'] = this.codigo_act;
        establishment['nombre_act'] = this.nombre_act;
        establishment['per_ocu'] = this.per_ocu;
        establishment['tipo_vial'] = this.tipo_vial;
        establishment['nom_vial'] = this.nom_vial;
        establishment['tipo_v_e_1'] = this.tipo_v_e_1;
        establishment['nom_v_e_1'] = this.nom_v_e_1;
        establishment['tipo_v_e_2'] = this.tipo_v_e_2;
        establishment['nom_v_e_2'] = this.nom_v_e_2;
        establishment['tipo_v_e_3'] = this.tipo_v_e_3;
        establishment['nom_v_e_3'] = this.nom_v_e_3;
        establishment['numero_ext'] = this.numero_ext;
        establishment['letra_ext'] = this.letra_ext;
        establishment['edificio'] = this.edificio;
        establishment['edificio_e'] = this.edificio_e;
        establishment['numero_int'] = this.numero_int;
        establishment['letra_int'] = this.letra_int;
        establishment['tipo_asent'] = this.tipo_asent;
        establishment['nom_asent'] = this.nomb_asent;
        establishment['tipoCenCom'] = this.tipoCenCom;
        establishment['nom_CenCom'] = this.nom_CenCom;
        establishment['num_local'] = this.num_local;
        establishment['cod_postal'] = this.cod_postal;
        establishment['cve_ent'] = this.cve_ent;
        establishment['entidad'] = this.entidad;
        establishment['cve_num'] = this.cve_mun;
        establishment['municipio'] = this.municipio;
        establishment['cve_loc'] = this.cve_loc;
        establishment['localidad'] = this.localidad;
        establishment['ageb'] = this.ageb;
        establishment['manzana'] = this.manzana;
        establishment['telefono'] = this.telefono;
        establishment['correoelec'] = this.correoelec;
        establishment['www'] = this.www;
        establishment['tipoUniEco'] = this.tipoUniEco;
        establishment['latitud'] = this.latitud;
        establishment['longitud'] = this.longitud;
        establishment['fecha_alta'] = this.fecha_alta;
    }

    clone() {
        return new Establishment(this.id,
            this.clee,
            this.nom_estab,
            this.raz_social,
            this.codigo_act,
            this.nombre_act,
            this.per_ocu,
            this.tipo_vial,
            this.nom_vial,
            this.tipo_v_e_1,
            this.nom_v_e_1,
            this.tipo_v_e_2,
            this.nom_v_e_2,
            this.tipo_v_e_3,
            this.nom_v_e_3,
            this.numero_ext,
            this.letra_ext,
            this.edificio,
            this.edificio_e,
            this.numero_int,
            this.letra_int,
            this.tipo_asent,
            this.nomb_asent,
            this.tipoCenCom,
            this.nom_CenCom,
            this.num_local,
            this.cod_postal,
            this.cve_ent,
            this.entidad,
            this.cve_mun,
            this.municipio,
            this.cve_loc,
            this.localidad,
            this.ageb,
            this.manzana,
            this.telefono,
            this.correoelec,
            this.www,
            this.tipoUniEco,
            this.latitud,
            this.longitud,
            this.fecha_alta,);
    }
}

const EstablishmentSchema = {
    name: 'Establishment',
    primaryKey: 'id',
    properties: {
        id: 'int',
        clee: 'string',
        nom_estab: 'string',
        raz_social: 'string',
        codigo_act: 'int',
        nombre_act: 'string',
        per_ocu: 'string',
        tipo_vial: 'string',
        nom_vial: 'string',
        tipo_v_e_1: 'string',
        nom_v_e_1: 'string',
        tipo_v_e_2: 'string',
        nom_v_e_2: 'string',
        tipo_v_e_3: 'string',
        nom_v_e_3: 'string',
        numero_ext: 'int',
        letra_ext: 'string',
        edificio: 'string',
        edificio_e: 'string',
        numero_int: 'int',
        letra_int: 'string',
        tipo_asent: 'string',
        nomb_asent: 'string',
        tipoCenCom: 'string',
        nom_CenCom: 'string',
        num_local: 'int',
        cod_postal: 'int',
        cve_ent: 'int',
        entidad: 'string',
        cve_mun: 'int',
        municipio: 'string',
        cve_loc: 'int',
        localidad: 'string',
        ageb: 'string',
        manzana: 'int',
        telefono: 'int',
        correoelec: 'string',
        www: 'string',
        tipoUniEco: 'string',
        latitud: 'float',
        longitud: 'float',
        fecha_alta: 'string',
    }
}

Establishment.schema = EstablishmentSchema