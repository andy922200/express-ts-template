export interface CustomError extends Error {
  statusCode: number
  isOperational: boolean
}

export enum IEnvType {
  dev = 'dev',
  production = 'production',
}
