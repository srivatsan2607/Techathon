var express = require("express"),
    router = express.Router(),
    User = require("../models/userModel"),
    passport = require("passport")

router.post("/create", function (req, res) {
    User.register(new User({
        username: req.body.username,
        emailId: req.body.emailId,
        rollType: req.body.rollType,
        plan: req.body.plan //Send plan id
    }), req.body.password, function (err, user) {
        if (err) {
            res.send(err)
        }
        passport.authenticate("local")(req, res, function () {
            res.send(user);
        })
    })
});

//Update endpoint
router.put("/update/:id", function (req, res) {
    User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        emailId: req.body.emailId,
        rollType: req.body.rollType,
        plan: req.body.plan //Send plan id
    }, function (err, updatedUser) {
        if (err) {
            res.send(err)
        } else {
            res.send(updatedUser)
        }
    })
});

//Show endpoint
router.get("/view/:id", function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err || !user) {
            res.send(err)
        } else {
            res.send(user)
        }
    })
})

//Delete endpoint
router.delete("/delete/:id", function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err || !user) {
            req.send(err)
        }
    })
});

router.post("/login", function (req, res, next) {
    passport.authenticate("local", {
        successRedirect: next(),
    })(req, res);
});

router.get("/logout", function (req, res) {
    req.logout();
})

module.exports = router;