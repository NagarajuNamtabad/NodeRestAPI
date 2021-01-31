const { validationResult } = require('express-validator/check');
const ExamResult = require('../models/examResult');
const Post = require('../models/post');
const { post } = require('../routes/feed');

exports.getResults = async (req, res, next) => {
    try {
    const results = await ExamResult.findAll();
    for(let result of results) {
        var marks = [result.english, result.maths, result.physics, result.chemistry];

        result.totalMarks = marks.reduce(addTotal);

        function addTotal(total, num)
        {
            return total + num;
        }
    }
         res
         .status(200)
         .json({message: 'Fetched results successful', examResult: results});
    } catch (error) {
        if(!err.statusCode) {
            err.statusCode = 500;
       }
       next(err);
    }
};

exports.createResult = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error; 
    }
    
  const examName = req.body.examName;
  const studentName = req.body.studentName;
  const english = req.body.english;
  const maths = req.body.maths;
  const physics = req.body.physics;
  const chemistry = req.body.chemistry;
    
    //Create post in db
    const examResult = new ExamResult({
        examName: examName,
        studentName: studentName,
        english: english,
        maths: maths,
        physics: physics,
        chemistry: chemistry
    });
    try {
    const result = await examResult.save();
         res.status(201).json({
            message: 'Result created successfully!',
            examResult: result
       });
    } catch (error) {
        if(!err.statusCode) {
            err.statusCode = 500;
       }
       next(err);
    }
}; 

exports.getResult = async (req, res, next) => {
    const resultId = req.params.resultId;
    try {
   const result1 = await ExamResult.findByPk(resultId);
        if(!result1) {
           const error = new Error('Could not find Result.');
           error.statusCode = 404;
           throw error;
        }
            var marks = [result1.english, result1.maths, result1.physics, result1.chemistry];

            result1.totalMarks = marks.reduce(addTotal);

            function addTotal(total, num) {
                return total + num;
            }
        res.status(200).json({ message: 'Result fetched.', examResult: result1 });
    } catch (error) {
        if(!err.statusCode) {
            err.statusCode = 500;
       }
       next(err);
    }
};

exports.updateResult = async (req, res, next) => {
    const resId = req.params.resId;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error; 
    }

    const examName = req.body.examName;
    const studentName = req.body.studentName;
    const english = req.body.english;
    const maths = req.body.maths;
    const physics = req.body.physics;
    const chemistry = req.body.chemistry;
    
    try {
    const result = await ExamResult.findByPk(resId);
        if(!result) {
            const error = new Error('Could not find Result.');
            error.statusCode = 404;
            throw error;
         }
         result.examName = examName;
         result.studentName = studentName;
         result.english = english;
         result.maths = maths;
         result.physics = physics;
         result.chemistry = chemistry;
         const result1 = await result.save();

         var marks = [result1.english, result1.maths, result1.physics, result1.chemistry];

         result1.totalMarks = marks.reduce(addTotal);

         function addTotal(total, num)
         {
             return total + num;
         }
        res.status(200).json({message: 'Result Updated!', result: result1});
    } catch (error) {
        if(!err.statusCode) {
            err.statusCode = 500;
       }
       next(err);
    }
};

exports.deleteResult = async (req, res, next) => {
    const resId = req.params.resId;
    
    try {
    const result = await ExamResult.findByPk(resId);
         if(!result) {
            const error = new Error('Could not find Result.');
            error.statusCode = 404;
            throw error;
         }
        // check logged in user
        const result1 = await result.destroy();
        res.status(200).json({message: 'Deleted Result!'});
    } catch (error) {
        if(!err.statusCode) {
            err.statusCode = 500;
       }
       next(err);
    }
};
