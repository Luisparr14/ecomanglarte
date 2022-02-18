'use strict';

import Moment from 'moment';
import axios from 'axios';
import { clientId, clientSecret, authUri, authGrantType } from './Config';

let token = null;
let tokenType = null;
let expiresAt = null;

const auth = async () => {
    try {
        const authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': authorization
        };

        const endpoint = `${authUri}?grant_type=${authGrantType}`;
        
        try {
            const response = await axios.post(endpoint, {}, { headers });
            if (!!response && response.status === 200 && response.data) {
                token = response.data.access_token;
                tokenType = response.data.token_type;
                expiresAt = Moment(new Date()).add(response.expires_in, 'seconds');
            } else {
                throw new Exception('Unable to connect to Nequi, please check the information sent.');
            }
        } catch (error) {
            let msgError = '';
            if (error.isAxiosError) {
                const { status = 'Undefined', statusText = 'Undefined' } = error.response;

                msgError = `Axios error ${status} -> ${statusText}`;
            } else {
                msgError = `Error -> ${error}`;
            }

            throw new Error(msgError);
        }
    } catch (e) {
        throw new Error('Unable to auth to Nequi, please check the information sent.');
    }
}

const getToken = async (full = true) => {
    if (!isValidToken()) {
        await auth();
    }
    return full ? `${tokenType} ${token}` : token;
}

const isValidToken = () => {
    if(!expiresAt) {
        return false;
    }
    return Moment(new Date()).isBefore(expiresAt);
}

export {
    auth,
    getToken,
    isValidToken
}