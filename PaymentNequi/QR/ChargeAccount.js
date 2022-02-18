
import axios from 'axios';
import { getToken } from '../Auth'
import { apiKey, apiBasePath } from '../Config';
import { NEQUI_STATUS_CODE_SUCCESS } from '../utils/Constants';

const RestEndpoint = '/agents/v2/-services-cashinservice-cashin';

const ChargeAccount = async (info) => {
  const authorization = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': authorization,
    'x-api-key': apiKey
  };

  const endpoint = `${apiBasePath}${RestEndpoint}`;
  const MessageID = Math.random().toString(36).slice(3)
  const data = {
    RequestMessage: {
      RequestHeader: {
        Channel: 'MF-001',
        RequestDate: new Date(),
        MessageID: MessageID,
        ClientID: "12345",
        Destination: {
          ServiceName: 'CashInService',
          ServiceOperation: 'cashIn',
          ServiceRegion: 'C001',
          ServiceVersion: '1.0.0'
        }
      },
      RequestBody: {
        any: {
          cashInRQ: {
            phoneNumber: info.phoneNumber,
            code: '1',
            value: info.amount
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
          name = ''
        } = data.ResponseMessage.ResponseBody.any.cashInRS;

        console.info(
          'Recarga realizada correctamente\n' +
          `- Id Transacción -> ${trnId.trim()}\n` +
          `- Fecha Transacción -> ${date}\n` +
          `- Nombre -> ${name}`
        );
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
  ChargeAccount
}

