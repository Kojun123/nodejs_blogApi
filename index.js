const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

// 간단한 라우트 테스트
app.get('/', (req, res) => {
  res.send('내 첫 Node.js 블로그 뿌이뿌이')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
