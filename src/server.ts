import express from 'express'
// import 'express-async-errors'
// import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})