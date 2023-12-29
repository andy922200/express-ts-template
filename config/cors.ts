import { CorsOptions } from 'cors'
const allowedOrigins = [
  `${process.env.ALLOWED_ORIGIN_1}:${process.env.DEV_PORT}`,
  `${process.env.ALLOWED_ORIGIN_2}:${process.env.DEV_PORT}`,
]

const corsConfigs: CorsOptions = {
  origin: (reqOrigin, cb) => {
    // !reqOrigin is for postman
    !reqOrigin || allowedOrigins.indexOf(reqOrigin) !== -1
      ? cb(null, true)
      : cb(new Error('Origin not allowed by Cors'))
  },
}

export default corsConfigs
