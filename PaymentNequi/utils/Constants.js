'use strict';

const NEQUI_STATUS_CODE_SUCCESS = () => {
    return "0";
}

const NEQUI_STATUS_PAYMENT_SUCCESS = () => {
    return "35";
}

const NEQUI_STATUS_PAYMENT_PENDING = () => {
    return "33";
}

const NEQUI_STATUS_PAYMENT_TIMEOUT = () => {
    return "10-454";
}

export {
    NEQUI_STATUS_CODE_SUCCESS,
    NEQUI_STATUS_PAYMENT_SUCCESS,
    NEQUI_STATUS_PAYMENT_PENDING,
    NEQUI_STATUS_PAYMENT_TIMEOUT
};