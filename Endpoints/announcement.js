var express = require("express"),
    router = express.Router({ mergeParams: true }),
    Announcement = require("../models/announcementModel"),
    middleware = require("../connections/middleware");

//Create endpoint
router.post("/create", middleware.isLoggedin, function (req, res) {
    Announcement.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.userId,
    }, function (err, annoucements) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(annoucements);
        }
    });
})

//All announcements endpoint
router.get("/view/:announcementId", middleware.isLoggedin, function (req, res) {
    classroom.findById(req.params.classId, function (req, res) {
        if (err) {
            res.send(err)
        }
        else {
            Announcement.findById(req.params.id).populate("comments").exec(function (err, announcements) {
                if (err || !announcements) {
                    res.send(err)
                } else {
                    res.send(announcements)
                }
            })
        }
    })
})

//All announcements
router.get("/view", middleware.isLoggedin, function (req, res) {
    classroom.findById(req.params.classId, function (err, classroom) {
        if (err) {
            res.send(err)
        }
        else {
            Announcement.find({}).populate("comments").exec(function (err, announcements) {
                if (err || !announcements) {
                    res.send(err)
                } else {
                    res.send(announcements)
                }
            })
        }
    })
})

//Show endpoint
router.get("/view/:announcementId", middleware.isLoggedin, function (req, res) {
    classroom.findById(req.params.classId, function (err, classroom) {
        if (err) {
            res.send(err)
        }
        else {
            Announcement.findById(req.params.id).populate("comments").exec(function (err, announcements) {
                if (err || !announcements) {
                    res.send(err)
                } else {
                    res.send(announcements)
                }
            })
        }
    })
})

//Delete endpoint
router.delete("/delete/:announcementId", middleware.isLoggedin, function (req, res) {
    classroom.findById(req.params.classId, function (err, classroom) {
        if (err) {
            res.send(err)
        }
        else {
            Announcement.findByIdAndRemove(req.params.announcementId, function (err, announcement) {
                if (err || !announcement) {
                    res.send(err)
                }
                else {
                    res.send(announcement)
                }
            })
        }
    })
})


module.exports = router;