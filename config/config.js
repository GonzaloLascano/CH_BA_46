const config = {}

config.SERVER = {
    PORT: process.argv[2] || process.env.PORT || 3030, //este ultimo para poder distinguirlo mas facil del resto en caso de que algo falle.
}

module.exports = {...config}