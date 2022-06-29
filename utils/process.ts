export const initUncaughtException = ()=>{
    process.on("uncaughtException", (err)=>{
        console.error("UnCaught Exception!")
        console.error(err)
        process.exit(1)
    })
}

export const initUnhandledRejection = ()=>{
    process.on("unhandledRejection", (err, promise)=>{
        console.error(`Unhandled rejection: ${promise}, Reason:${err}`)
    })
}


