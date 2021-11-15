const app = require('./index')
const port = process.env.PORT || 5000

console.log(`Node environment: ${process.env.NODE_ENV}`)
app.listen(port, () => {
  console.log(`Example app listening at port http://localhost:${port}`)
})
