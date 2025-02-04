const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/sign-up',userMiddleware.createUser , userController.createUser);
router.post('/sign-in', userMiddleware.signIn, userController.signIn);
router.post('/log-out',userController.logOut);
router.put('/update-user/:id',userMiddleware.updateUser, userController.updateUser);
router.delete('/delete-user/:id',userMiddleware.deleteUser, userController.deleteUser);
router.get('/all-user',userMiddleware.auth, userController.getAllUser);
router.get('/detail-user/:id', userController.detailUser);
router.post('/refresh-token', userController.refreshToken);

module.exports = router;