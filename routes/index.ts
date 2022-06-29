import { Express } from "express"
import demoRouter from "./demo"


export const routerList = (app:Express) => {
    app.use("/demo", demoRouter)
}