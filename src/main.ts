/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import { connect } from 'mongoose'

const { PORT } = process.env

async function databaseStart () {
  const { BD_URL } = process.env

  await connect(
    BD_URL, (err) => {
      if (err) throw err
      console.log('Mongo Started!')
    }
  )
}

const bootstrap = async (): Promise<void> => {
  try {
    app.listen(
      PORT, () => console.log(`App linstening on port ${PORT}`)
    )
    await databaseStart()
  } catch (error) {
    console.error(error)
  }
}

process.on('uncaughtException', (error) => {
  console.error(error)
  process.exit(1)
})

bootstrap()
