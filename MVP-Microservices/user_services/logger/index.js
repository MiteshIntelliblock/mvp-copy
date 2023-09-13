const { createLogger, format, transports } = require("winston");
const { prettyPrint } = format;
require("winston-mongodb");

const logger = createLogger({
  level: "error",
  format: format.combine(format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }), prettyPrint()),
  defaultMeta: { service: "user-services" },
  transports: [new transports.File({ filename: "./logger/error.log", level: "error" })]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple()
    })
  );
}

// MongoDB transport
// new transports.MongoDB({
//   level: 'error',
//   //mongo database connection link
//   db : 'mongodb://localhost:27017/logs',
//   options: {
//       useUnifiedTopology: true
//   },
//   // A collection to save json formatted logs
//   collection: 'server_logs',
//   format: format.combine(
//   format.timestamp(),
//   // Convert logs to a json format
//   format.json())
// })

module.exports = logger;
