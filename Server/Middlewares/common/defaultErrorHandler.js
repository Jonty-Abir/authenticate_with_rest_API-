function defaultErrorHandler(err, req, res, next) {
  if (err) {
    console.log(err.message);
    res.json({
      error: {
        msg: err.message,
      },
    });
  }
}

function notFound(req, res, next) {
  res.status(404).send("Not Found!");
}
module.exports = { defaultErrorHandler, notFound };
