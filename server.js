const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config();
const pool = require("./config/db")

//Enable cors
const cors = require("cors")

app.use(express.json())
app.use(cors())


app.get("/health", (req, res) => {
  res.sendStatus(200)
})

app.get('/dbtest', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    }
    else {
      res.send(result.rows)
    }
  })
})


//<--business logic code ends here-->


// route not found middleware
app.use((req, res, next) =>
  res.status(404).send("You are looking for something that we do not have!")
)


app.use(async (err, req, res, next) => {
  const errorSource = err.apiName || "Dashboard Backend";
  const errorMessage = err.message || 'Unknown error';

  try {
      console.log(`API Failed: errorSource - ${errorSource}, errorMessage - ${errorMessage}`, {
        "Error": err
      })
      res.status(500).send(`Something went wrong! Please try after some time.`);
  } catch (error) {
      console.log('Error:', error)
  }
})



const PORT = process.env.PORT || 5323
const HOST = process.env.HOST || `localhost`

app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
})
