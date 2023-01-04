const successHandle = (res, message = '', data) => {
  Array.isArray(data) || typeof data === 'object' || data?.length > 1
    ? res.send({
        status: true,
        message: message,
        data,
      })
    : res.send({
        status: true,
        message: message,
      });
};

module.exports = successHandle;
