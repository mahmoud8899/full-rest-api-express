import {
    singup,
    login,
    userId,
    listUsers
    
} from '../container/AuthContainer.js'
import express from 'express'
import verify from '../Jwt/Verfiy.js'
const router = express.Router()


// user Change..

// singUp
router.post('/user/create/', singup)
// logo in...
router.post('/user/login/', login)
// list users 
// logo in...
router.get('/user/list/', listUsers)

// user Info....
router.get('/user/user/', verify, userId)







export default router

