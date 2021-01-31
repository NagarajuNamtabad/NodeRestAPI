const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET    /feed/posts
router.get('/results', isAuth, feedController.getResults);

// POST   /feed/post
router.post(
    '/result', 
    isAuth, 
[
    body('examName')
    .isString()
    .isLength({ min: 3 }),
    body('studentName')
    .isString()
    .isLength({ min: 3 }),
    body('english')
    .isNumeric(),
    body('maths')
    .isNumeric(),
    body('physics')
    .isNumeric(),
    body('chemistry')
    .isNumeric()

],
 feedController.createResult
 );

 router.get('/result/:resultId', isAuth, feedController.getResult);

 router.put(
     '/result/:resId',
      isAuth,
 [
    body('examName')
    .isString()
    .isLength({ min: 3 }),
    body('studentName')
    .isString()
    .isLength({ min: 3 }),
    body('english')
    .isNumeric(),
    body('maths')
    .isNumeric(),
    body('physics')
    .isNumeric(),
    body('chemistry')
    .isNumeric()

],
feedController.updateResult 
 );

 router.delete('/result/:resId', isAuth, feedController.deleteResult);

module.exports = router;