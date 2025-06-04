const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// 글 목록
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] })
    res.render('posts/index', { posts })
  } catch (err) {
    console.error(err)
    res.status(500).send('서버 에러')
  }
})

// 새 글 쓰기 페이지
router.get('/new', (req, res) => {
  res.render('posts/new')
})

// 글 작성 처리
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body
    await Post.create({ title, content })
    res.redirect('/posts')
  } catch (err) {
    console.error(err)
    res.status(500).send('서버 에러')
  }
})

// 상세보기
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (!post) {
      return res.status(404).send('글을 찾을 수 없음')
    }
    res.render('posts/show', { post })
  } catch (err) {
    console.error(err)
    res.status(500).send('서버 에러')
  }
})

module.exports = router
