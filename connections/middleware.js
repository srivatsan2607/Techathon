var Comment = require("../models/commentModel"),
	middlewares = {}

middlewares.codeCreation = function codeCreation() {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < 7; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

// middlewares.checkClassroomOwnership = function (req, res, next) {
// 	if (req.isAuthenticated()) {
// 		Classroom.findById(req.params.id, function (err, foundClass) {
// 			if (err || !foundClass) {
// 				req.send(err)
// 			} else {
// 				if (foundClass.author.id.equals(req.body.userId)) {
// 					next();
// 				} else {
// 					req.send(err)
// 				}
// 			}
// 		})
// 	} else {
// 		res.redirect("back")
// 	}
// }

middlewares.checkCommentOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err || !foundComment) {
				req.send(err)
			} else {
				if (foundComment.author.id.equals(req.body.userId)) {
					next();
				} else {
					req.send(err)
				}
			}
		})
	} else {
		req.send(err)
	}
}

middlewares.isLoggedin = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
}

module.exports = middlewares;
