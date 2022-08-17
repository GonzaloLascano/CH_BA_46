const config = {}

config.SERVER = {
    PORT: process.argv[2] || process.env.PORT || 3030, //este ultimo para poder distinguirlo mas facil del resto en caso de que algo falle.
}

config.MONGO = {
    MONGOURL: process.env.MONGOURL
}

config.SESSION = {
    SECRET: process.env.SESSIONSECRET
}

module.exports = {...config}