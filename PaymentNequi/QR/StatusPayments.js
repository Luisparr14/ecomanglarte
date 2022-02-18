
import axios from 'axios';
import Constants from '../../utils/Constants';
import { getToken } from '../Auth'
import { apiKey, apiBasePath, clientId } from '../Config';
import {
  NEQUI_STATUS_CODE_SUCCESS,
  NEQUI_STATUS_PAYMENT_PENDING,
  NEQUI_STATUS_PAYMENT_TIMEOUT,
  NEQUI_STATUS_PAYMENT_SUCCESS
} from '../utils/Constants';

const RestEndpoint = '/payments/v2/-services-paymentservice-getstatuspayment';

const ChangeStatus = async (idPedido, status) => {
  await axios.post(`/api/orders/changeStatus`, {
    "idPedido": idPedido,
    "status": status
  })
}

const StatusPayment = async (idPedido) => {
  const authorization = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: authorization,
    'x-api-key': apiKey
  };

  const endpoint = `${apiBasePath}${RestEndpoint}`;
  const MessageID = Math.random().toString(36).slice(3)
  
  const data = {
    "RequestMessage": {
      "RequestHeader": {
        "Channel": "PQR03-C001",
        "RequestDate": new Date().toISOString(),
        "MessageID": MessageID,
        "ClientID": clientId,
        "Destination": {
          "ServiceName": "PaymentsService",
          "ServiceOperation": "getStatusPayment",
          "ServiceRegion": "C001",
          "ServiceVersion": "1.0.0"
        }
      },
      "RequestBody": {
        "any": {
          "getStatusPaymentRQ": {
            "codeQR": `C001-10011-${idPedido}`,
          }
        }
      }
    }
  };
  try {
    const response = await axios.request({
      url: endpoint,
      method: 'POST',
      headers,
      data
    });

    if (!!response && response.status === 200 && response.data) {
      const { data } = response;
      const {
        StatusCode: statusCode = '',
        StatusDesc: statusDesc = ''
      } = data.ResponseMessage.ResponseHeader.Status;

      if (statusCode === NEQUI_STATUS_CODE_SUCCESS()) {
        const {
          trnId = '',
          date = '',
          value = '',
          status = ''
        } = data.ResponseMessage.ResponseBody.any.getStatusPaymentRS;

        console.info(
          'Datos de la transaccion\n' +
          `- Id Transacción -> ${trnId.trim()}\n` +
          `- Fecha Transacción -> ${date}\n` +
          `- Status -> ${status}`
        );
        
        switch (status) {
          case NEQUI_STATUS_PAYMENT_SUCCESS():
            ChangeStatus(idPedido, Constants.orderStatus.pagado);
            return {
              status: Constants.orderStatus.pagado,
              value: value.trim()
            }
          case NEQUI_STATUS_PAYMENT_PENDING():
            ChangeStatus(idPedido, Constants.orderStatus.pendiente);
            return {
              status: Constants.orderStatus.pendiente,
              value: value.trim()
            }
        }
      } else if (statusCode === NEQUI_STATUS_PAYMENT_TIMEOUT()) {
        ChangeStatus(idPedido, Constants.orderStatus.pagoCaducado);
        return {
          status: Constants.orderStatus.pagoCaducado,
        }
      } else {
        throw new Error(`Error ${statusCode} = ${statusDesc}`)
      }
    } else {
      throw new Error('Unable to connect to Nequi, please check the information sent.');
    }
  } catch (error) {
    let msgError = '';

    if (error.isAxiosError) {
      const { status = 'Undefined', statusText = 'Undefined' } = error.response;

      msgError = `Axios error ${status} -> ${statusText}`;

      throw new Error(msgError);
    } else {
      throw error;
    }

  }
}

export {
  StatusPayment
}

