import express from 'express'
import multer from 'multer'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
const upload = multer()

app.use(cors()) // enable CORS for frontend

app.post('/caption', upload.any(), async (req, res) => {
  try {
    const formData = new FormData()

    for (const file of req.files) {
      formData.append(file.fieldname, file.buffer, file.originalname)
    }

    for (const [key, value] of Object.entries(req.body)) {
      formData.append(key, value)
    }

    const response = await fetch('https://5f378e93164a.ngrok-free.app/caption', {
      method: 'POST',
      body: formData,
      headers: { 'ngrok-skip-browser-warning': '69420' }
    })

    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Proxy failed' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
