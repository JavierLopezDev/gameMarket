export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    console.error(err.errors);
    return res
      .status(400)
      .json({ error: err.errors.map((err) => err.message) });
  }
};
