module.exports = (Joi) => ({
  create: async (payload) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      last_name: Joi.string().min(3).max(30).required(),
      birth_date: Joi.date().format('YYYY-MM-DD').required(),
    })
    return await validate(schema, payload)
  },
})

const validate = (schema, payload) => {
  const { value, error } = schema.validate(payload)

  if (error) {
    const messagesError = []
    error.details.forEach((value) => {
      messagesError.push(value.message)
    })

    throw { status: false, message: messagesError }
  }

  return value
}
