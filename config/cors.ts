import { CorsOptions } from 'cors'

export const generateCorsConfig = ({
  allowedOrigins = [],
}: {
  allowedOrigins?: string[]
}): CorsOptions => {
  const corsConfigs: CorsOptions = {
    origin: (reqOrigin, cb) => {
      // !reqOrigin is for tools like Postman that don't send an origin
      !reqOrigin || allowedOrigins?.includes(reqOrigin)
        ? cb(null, true)
        : cb(new Error('Origin not allowed by CORS'))
    },
  }
  return corsConfigs
}

export default generateCorsConfig
