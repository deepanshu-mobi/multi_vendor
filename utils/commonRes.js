const response = (req, res, data, status, message, success) => {
    return res.status(status).json({
        success: success,
        message: message,
        data: data || {}
    })
}

module.exports = {
  response
};
