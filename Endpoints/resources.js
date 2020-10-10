const express = require("express");
const router = express.Router();
var Grid = require("gridfs-stream"),
    mongoose = require("mongoose");
const Announcement = require("../models/announcementModel.js");

var ObjectId = mongoose.Types.ObjectId;

const conn = mongoose.connection;
let gfs;
conn.once('open', function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    // all set!
})

//Create route
router.post("/upload", upload.single("file"), function (req, res) {
    Announcement.findById(req.params.announcementId, function (err, annoucement) {
        if (err) {
            res.send(err)
        }
        else {
            announcement.resources.push(req.file.id)
        }
    })
})

router.get("/:fileid", (req, res) => {
    const file = gfs
        .files.find({
            _id: req.params.fileid
        }, (err, file) => {
            if (!file || file.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
            } else {
                var readstream = gfs.createReadStream({ _id: req.params.fileid });
                readstream.pipe(res)
            };
        })
});


//Delete route
router.delete("/:id", function (req, res) {
    gfs.remove({ _id: ObjectId(req.params.fileid), root: "uploads" }, (err, gridstore) => {
        if (err) {
            return res.status(404).json({
                err: err
            });
        }
    })
})

module.exports = router;
