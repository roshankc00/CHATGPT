const express=require('express')
const { summaryHandler, chatBot, jsConverter,selfImageGenearator } = require('../controllers/aiController')
const authMiddleware = require('../middlewares/authMiddleware')
const router=express.Router()



router.post('/summary', authMiddleware,summaryHandler)
router.post('/summary',authMiddleware,selfImageGenearator)
router.post('/summary',authMiddleware,jsConverter)
router.post('/summary',authMiddleware,chatBot)


module.exports=router 