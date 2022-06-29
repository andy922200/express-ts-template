/* init basic express app */
import express, { Request, Response, NextFunction } from "express"
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* require config */
import dotenv from "dotenv"
dotenv.config()

/* PORT should be capitalized */
const port = process.env.PORT || 3000

/* Routes */
import { routerList } from "./routes"
routerList(app)

/* Error Handling */
import { initUncaughtException, initUnhandledRejection } from "./utils/process"
import { appError, errorHandlerMainProcess } from "./utils/mixinTools"
initUncaughtException()
initUnhandledRejection()
app.use((req:Request, res:Response, next:NextFunction)=>{
    next(appError(404, "40401", "No Routes"))
})
app.use(errorHandlerMainProcess)

/* Display Port to assure all services are on. */
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})