
let clientId = null
let clientSecret = null
let apiKey = null
let authUri = null
let authGrantType = null
let apiBasePath = null

const loadEnvVars = () => {
    clientId = process.env.NEXT_PUBLIC_NEQUI_CLIENT_ID;
    clientSecret = process.env.NEXT_PUBLIC_NEQUI_CLIENT_SECRET;
    apiKey = process.env.NEXT_PUBLIC_NEQUI_API_KEY;
    authUri = process.env.NEXT_PUBLIC_NEQUI_AUTH_URI;
    authGrantType = process.env.NEXT_PUBLIC_NEQUI_AUTH_GRANT_TYPE;
    apiBasePath = process.env.NEXT_PUBLIC_NEQUI_API_BASE_PATH;
}

loadEnvVars();

export {
    clientId,
    clientSecret,
    apiKey,
    authUri,
    authGrantType,
    apiBasePath
}