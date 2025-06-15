import dotenv from 'dotenv'

dotenv.config({path: '.env'})

export const _PORT = process.env.PORT || 5000
export const _JWTSECRET = process.env._JWT_SECRET!
export const _serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS!