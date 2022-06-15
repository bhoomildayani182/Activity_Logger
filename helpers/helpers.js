const successResponse = function (status, data, res) {
  res.status(status).send(data);
};

const errorResponse = function (status, error, res) {
  res.status(status).send({ error: error });
};

module.exports = {
  successResponse,
  errorResponse,
};
