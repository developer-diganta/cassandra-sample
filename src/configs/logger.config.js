const loggerLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
  }
};

const loggerFiles = {
    "error":"logs/error.log",
    "warn":"logs/warn.log",
    "info":"logs/info.log",
    "debug":"logs/debug.log"
}

module.exports = {
    loggerLevels,
    loggerFiles
}
