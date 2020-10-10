var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    Comment = require("./commentModel")

//Schema Setup
var ClassroomSchema = new Schema({
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    code: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    announcements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Announcement"
    }]
});

ClassroomSchema.pre('remove', async function () {
    await Comment.remove({
        _id: {
            $in: this.comments
        }
    })
});

module.exports = mongoose.model("Classroom", ClassroomSchema);