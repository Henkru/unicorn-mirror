import logger from './logger'
const log = logger('backend')

export default function (io, backends) {
  io.on("connection", sck => {
    log.info("Client connected")

    sck.on('disconnect', () => {
      log.info("Client disconnected")
    })

    sck.on('notification', msg => {
      const { module, sender, data } = msg

      if (backends[module] && backends[module].receiveNotification) {
        try {
          backends[module].receiveNotification(sender, data, res => {
            sck.emit(`notification_${sender}`, {
              module: module,
              sender: sender,
              data: res
            })
          })
        }
        catch (e) {
          log.error(`[${module}] crashed: `, e)
        }
      }
      else {
        log.error(`[${module}] does not contain the backend`)
      }
    })
  })
}
