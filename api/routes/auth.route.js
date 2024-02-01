import express from 'express'
const router = express.Router()
import {signup ,login,google } from '../controller/auth.controller.js'

router.route('/signup').post(signup)
router.post("/signin",login)
router.post('/google',google)

export default router