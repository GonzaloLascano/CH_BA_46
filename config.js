const config = {}

config.SERVER = {
    PORT: process.env.PORT,
}

config.MONGO = {
    MONGOURL: process.env.MONGOURL
}

config.SESSION = {
    SECRET: process.env.SESSIONSECRET
}

module.exports = {...config}