const validateRequest = (schema) => async (req, res, next) => {
    // if no schema is provided, skip validation
    if (!schema) return next();
  
    let body;
    // if request is multipart/form-data, JSON.parse every field
    if (req.headers['content-type'] === 'multipart/form-data') {
      Object.keys(req.body).forEach((key) => {
        body[key] = JSON.parse(req.body[key]);
      });
    }
    // if request is application/json, use req.body
    else {
      
      body = req.body;
    }
  
    try {
      await schema.validate(
        {
          body,
          query: req.query,
          params: req.params,
        },
        { abortEarly: false }
      );
  
      return next();
    } catch (e) {
      console.log(e)
      return res.status(400).send(e.errors);
    }
  };
  
module.exports = validateRequest;
  