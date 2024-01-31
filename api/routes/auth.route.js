import express from 'express'
const router = express.Router()
import {signup ,login } from '../controller/auth.controller.js'

router.route('/signup').post(signup)
router.post("/signin",login)

export default router