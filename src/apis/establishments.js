import Message from '../models/Message';
import messages from '../constants/messages';
import { establishments } from './../db/establishments';

export const getAllRegistries = () => {
    let msg = new Message();
    const establishmentsAll = establishments;

    try {
        msg.result = establishmentsAll;
        msg.message = messages.REGISTROS_RECUPERADOS;
    } catch (e) {
        console.log("ERORORORORO:  ", e.message)
        msg.result = [];
        msg.message = messages.REGISTROS_RECUPERADOS_ERROR + ': ' + e.message;
    } finally {
        return msg;
    }
}