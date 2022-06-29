import { Request, Response, NextFunction } from "express"
import { CustomError } from "../types/index"

export const getHttpResponse = ({data, message}:{data: string | any[], message?: string}) => {
    const result = { status: "success" } as Record<string, any>
    if (data) result.data = data
    if (message) result.message = message
    return result
}

// custom error
export const appError = (statusCode:number, errName:string, errMessage:string) => {
    const error = new Error(errMessage) as CustomError
    error.name = errName
    error.statusCode = statusCode
    error.isOperational = true
    return error
}
  
// async func catch
export const handleErrorAsync = function (func:(req:Request, res:Response, next:NextFunction) => Promise<void>) {
    return function (req:Request, res:Response, next:NextFunction) {
        func(req, res, next).catch(
            function (e:any) {
                console.log(e) // for console debug
                return next(appError(400, "", "Something wrong happened"))
            }
        )
    }
}
  
// error in dev
export const resErrorDev = (err:CustomError, res:Response) => {
    res.status(err.statusCode)
        .json({
            status: "false",
            message: err.message,
            error: err,
            stack: err.stack
        })
}

// system error or custom error
export const resErrorStatus = ({statusCode}:{statusCode:number}):"false"|"error" => {
    if( statusCode === 500 ){
        return "error"
    }
    return "false"
}
  
  
// error in prod
export const resErrorProd = (err:CustomError, res:Response) => {
    const resErrorData = {
        status: "",
        message: "",
        error: {
            name: ""
        }
    }
    resErrorData.status = resErrorStatus(err)
    if (err.isOperational) {
        resErrorData.message = err.message
        resErrorData.error.name = err.name
        res.status(err.statusCode)
            .json(resErrorData)
    } else {
        console.error("Fatal Error", err)
        resErrorData.message = "System Error! Please contact the administrator."
        res.status(err.statusCode)
            .json(resErrorData)
    }
}

export const errorHandlerMainProcess = (err:CustomError, req:Request, res:Response, next:NextFunction) => {
    if (err) {
        err.statusCode = err.statusCode || 500
        // dev
        if (process.env.NODE_ENV === "dev") {
            return resErrorDev(err, res)
        }
        // production
        if (err.name === "ValidationError") {
            err.message = "Please check your inputs."
            err.isOperational = true
            return resErrorProd(err, res)
        }
        resErrorProd(err, res)
    }
}