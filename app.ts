/* init basic express app */
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import corsConfigs from './config/cors'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsConfigs))

/* PORT should be capitalized */
const port = process.env.PORT || 3000

/* Routes */
import { routerList } from './routes'
routerList(app)

/* Error Handling */
import { errorHandlerMainProcess, appError } from './utils/mixinTools'
import { initUncaughtException, initUnhandledRejection } from './utils/process'
initUncaughtException()
initUnhandledRejection()

// no-matched route
app.use((req, res) => {
  errorHandlerMainProcess(appError(404, '40401', 'No Routes'), req, res)
})

/* Display Port to assure all services are on. */
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})
