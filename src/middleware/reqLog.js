const { log } = require("../../config/log.js")

const reqLog = (ctx, next) => {
    log.info(`${ctx.request.method} Request has been made to ${ctx.request.path}`)
    next()
}

module.exports = { reqLog }