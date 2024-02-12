

const logger = require('../utils/logger.utils');

function requestLogger(req, res, next) {
    // Log information about the incoming request
    logger.info(`Received ${req.method} request for ${req.url}`);

    // Capture the start time of the request
    const startTime = Date.now();

    // Save the original end method of the response object
    const originalEnd = res.end;

    // Override the end method to capture the response status code
    res.end = function(chunk, encoding) {
        // Restore the original end method
        res.end = originalEnd;

        // Calculate the duration of the request
        const duration = Date.now() - startTime;

        // Log information about the response and request duration
        if (res.statusCode >= 200 && res.statusCode < 300) {
            logger.info(`Request completed successfully with status ${res.statusCode} in ${duration} ms`);
        } else {
            logger.error(`Request failed with status ${res.statusCode} in ${duration} ms`);
        }

        // Call the original end method to actually end the response
        res.end(chunk, encoding);
    };

    // Proceed to the next middleware function
    next();
}

module.exports = requestLogger;
  