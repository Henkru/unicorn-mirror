import * as logger from 'winston'

export default function (io, backends) {
  io.on("connection", sck => {
    logger.info("Client connected")

    sck.on('disconnect', () => {
      logger.info("Client disconnected")
    })

    sck.on('notification', msg => {
      const { module, sender, data } = msg

      if (backends[module] && backends[module].receiveNotification) {
        backends[module].receiveNotification(sender, data, res => {
          sck.emit(`notification_${sender}`, {
            module: module,
            sender: sender,
            data: res
          })
        })
      }
      else {
        logger.error(`[${module}] does not contain the backend`)
      }
    })
  })
}
