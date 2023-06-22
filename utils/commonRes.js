const response = {
    successful: (message, data) => {
        return {
            success: true,
            message,
            data
        }
    },
    failed: (message, data) => {
        return {
            success: false,
            message,
            data: data || {}
        }
    }
}

module.exports = {
  response
};
