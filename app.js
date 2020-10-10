var express = require("express"),
	app = express(),
	bodyparser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	methodOverride = require("method-override"),
	announcementEndpoint = require("./Endpoints/announcement"),
	commentEndpoint = require("./Endpoints/comments"),
	classroomEndpoint = require("./Endpoints/classroom"),
	userEndpoint = require("./Endpoints/profile"),
	User = require("./models/userModel")
require("dotenv").config();

require("./connections/connection.js");
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//passport configuration
app.use(require("express-session")({
	secret: "Harry potter is my favourite series",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use("/:userId/classroom/:classId/announcements/", announcementEndpoint);
app.use("/:userId/classroom/:classId/announcements/:announcementId/comments", commentEndpoint);
app.use("/:userId/classroom/", classroomEndpoint);
app.use("/users/", userEndpoint)


app.listen(process.env.PORT || 3000, function () {
	console.log("Running DudesClass Server @port 3000");
})