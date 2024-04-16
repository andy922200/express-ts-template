import { Request, Response } from 'express'
import { CustomError, IEnvType } from '../types/index'

enum StatusType {
  success = 'success',
  fail = 'fail',
  error = 'error',
}

export const getHttpResponse = ({
  data,
  message,
}: {
  data: string | any[] | Record<string, any>
  message?: string
}) => {
  const result: Record<string, any> = { status: StatusType.success }
  if (data) result.data = data
  if (message) result.message = message
  return result
}

export const showError = (err: CustomError, res: Response) => {
  process.env.NODE_ENV === IEnvType.production ? resErrorProd(err, res) : resErrorDev(err, res)
}

// generate error Message
export const appError = (statusCode: number, errName: string, errMessage: string) => {
  const error = new Error(errMessage) as CustomError
  error.name = errName
  error.statusCode = statusCode
  error.isOperational = true
  return error
}

// system error or custom error
const resErrorStatus = ({ statusCode }: { statusCode: number }): StatusType => {
  if (statusCode === 500) {
    return StatusType.error
  }
  return StatusType.fail
}

const resErrorDev = (err: CustomError, res: Response) => {
  res.status(err.statusCode).json({
    status: StatusType.error,
    message: err.message,
    error: err,
    stack: err.stack,
  })
}

const resErrorProd = (err: CustomError, res: Response) => {
  const resErrorData = {
    status: '',
    message: '',
    error: {
      name: '',
    },
  }
  resErrorData.status = resErrorStatus(err)
  if (err.isOperational) {
    resErrorData.message = err.message
    resErrorData.error.name = err.name
    res.status(err.statusCode).json(resErrorData)
  } else {
    console.error('Fatal Error', err)
    resErrorData.message = 'System Error! Please contact the administrator.'
    res.status(err.statusCode).json(resErrorData)
  }
}

export const errorHandlerMainProcess = (err: CustomError, _req: Request, res: Response) => {
  if (err) {
    err.statusCode = err.statusCode || 500
    // dev
    if (process.env.NODE_ENV === IEnvType.dev) {
      return resErrorDev(err, res)
    }
    // production
    if (err.name === 'ValidationError') {
      err.message = 'Please check your inputs.'
      err.isOperational = true
      return resErrorProd(err, res)
    }
    resErrorProd(err, res)
  }
}
