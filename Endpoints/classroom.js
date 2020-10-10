var express = require("express"),
    router = express.Router({ mergeParams: true }),
    Classroom = require("../models/classroomModel"),
    middleware = require("../connections/middleware");
User = require("../models/userModel")

//Create endpoint
router.post("/create", middleware.isLoggedin, function (req, res) {
    req.body.code = middlewares.codeCreation
    Classroom.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.userId,
        code: req.body.code,
    }, function (err, classroom) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(classroom);
        }
    });
})

//class join endpoint
router.post("/join/:classCode", middleware.isLoggedin, function (req, res) {
    Classroom.find({ code: req.params.classCode }, function (err, classroom) {
        if (err) {
            res.send(err)
        }
        else {
            User.findById(req.body.userId, function (err, user) {
                if (err) {
                    res.send(err)
                } else {
                    if (!user.classrooms.includes(classroom._id)) {
                        user.classrooms.push(classroom._id)
                    }
                }
            })
            res.send(classroom)
        }
    })
})

//All classrooms
router.get("/view", middleware.isLoggedin, function (req, res) {
    Classroom.find({}, function (err, Classrooms) {
        if (err || Classrooms) {
            res.send(err)
        } else {
            res.send(Classrooms)
        }
    })
})

//Show endpoint
router.get("/view/:classId", middleware.isLoggedin, function (req, res) {
    Classroom.findById(req.params.classId, function (err, classroom) {
        if (err || classroom) {
            res.send(err)
        } else {
            res.send(classroom)
        }
    })
})

//Delete endpoint
router.delete("/delete/:classId", middleware.isLoggedin, function (req, res) {
    Classroom.findByIdAndRemove(req.params.classId, function (err, classroom) {
        if (err || classroom) {
            res.send(err)
        }
        else {
            res.send(classroom)
        }
    })
});
module.exports = router;