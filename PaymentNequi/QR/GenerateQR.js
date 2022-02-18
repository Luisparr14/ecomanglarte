'use strict';

import axios from 'axios';
import { getToken } from '../Auth';
import { apiKey, apiBasePath, clientId } from '../Config';
import { NEQUI_STATUS_CODE_SUCCESS } from '../utils/Constants';

const RestEndpoint = '/payments/v2/-services-paymentservice-generatecodeqr';

const QRPayment = async (info) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: await getToken(),
    'x-api-key': apiKey
  };

  const endpoint = `${apiBasePath}${RestEndpoint}`;
  const MessageID = Math.random().toString(36).slice(3)
  const data = {
    RequestMessage: {
      RequestHeader: {
        Channel: 'PQR03-C001',
        RequestDate: new Date(),
        MessageID: MessageID,
        ClientID: clientId,
        Destination: {
          ServiceName: 'PaymentsService',
          ServiceOperation: 'generateCodeQR',
          ServiceRegion: 'C001',
          ServiceVersion: '1.2.0'
        }
      },
      RequestBody: {
        any: {
          generateCodeQRRQ: {
            code: 'NIT_1',
            value: info.precio * info.cantidad
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
          codeQR = ''
        } = data.ResponseMessage.ResponseBody.any.generateCodeQRRS;

        const {
          MessageID = ''
        } = data.ResponseMessage.ResponseHeader;
        console.info(
          'Código generado correctamente\n' +
          `- Código QR -> ${codeQR}`
        );
        return { codeQR, MessageID };
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
  QRPayment
}