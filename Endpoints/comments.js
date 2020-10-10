var express = require("express"),
    router = express.Router({ mergeParams: true }),
    Announcement = require("../models/announcementModel"),
    Comment = require("../models/commentModel"),
    middleware = require("../connections/middleware"),
    Classroom = require("../models/classroomModel")


//Create endpoint
router.post("/create", middleware.isLoggedin, function (req, res) {
    Classroom.findById(req.params.classId, function (err, classroom) {
        if (err) {
            res.send(err)
        }
        else {
            Announcement.findById(req.params.announcementId, function (err, announcement) {
                if (err || !announcement) {
                    res.send(err)
                } else {
                    Comment.create(req.body.comment, function (err, comment) {
                        if (err || !comment) {
                            res.send(err)
                        } else {
                            comment.author.id = req.body.userId;
                            comment.save();
                            announcement.comments.push(comment);
                            announcement.save();
                            res.send(announcement)
                        }
                    })
                }
            })
        }
    })
});

//delete endpoint
router.delete("/delete/:comment_id", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.send(err)
        }
    })
})

module.exports = router;
