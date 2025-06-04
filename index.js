const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// 뷰 엔진 설정
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

// DB 연결 및 동기화
const sequelize = require('./models')  // models/index.js
const Post = require('./models/Post')  // 모델 불러오기

sequelize.sync()
  .then(() => console.log('DB 동기화 성공'))
  .catch(err => console.error('DB 동기화 실패', err))

// 루트 라우트 (홈페이지)
app.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] })
    res.render('index', { posts })
  } catch (err) {
    console.error(err)
    res.status(500).send('서버 에러')
  }
})

// Post 라우트 등록
const postRouter = require('./routes/post')
app.use('/posts', postRouter)

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
